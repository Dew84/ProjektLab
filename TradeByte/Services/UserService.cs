using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TradeByte.Services.Interfaces;
using TradeByte.Repositories.Interfaces;
using TradeByte.Dtos.Users;
using TradeByte.Models;
using Microsoft.Data.Sqlite;


namespace TradeByte.Services
{
    /// <summary>
    /// Felhasználói műveletek: saját profil megtekintése/frissítése, admin listázás/törlés.
    /// </summary>
    public class UserService : IUserService
    {
        private readonly IUserRepository _users;
        private readonly IUnitOfWork _uow;
        private readonly ICurrentUser _current;
        private readonly IAdRepository _ads;
        private readonly IRatingService _ratings;


        public UserService(IUserRepository users, IUnitOfWork uow, ICurrentUser current,
                          IRatingService ratings, IAdRepository ads)
        {
            _users = users;
            _uow = uow;
            _current = current;
            _ads = ads;
            _ratings = ratings;
        }


        public async Task<UserPublicDto?> GetPublicByIdAsync(int userId, CancellationToken ct = default)
        {
            var user = await _users.GetByIdAsync(userId, ct);
            if (user is null) return null;

            var adsCount = user.Classifieds?.Count ?? 0;

            double average = 0;
            int count = 0;

            try
            {
                // Próbáljuk meg lekérni az értékeléseket
                var rating = await _ratings.GetSummaryAsync(userId, ct);

                if (rating != null)
                {
                    average = rating.Average;
                    count = rating.Count;
                }
            }
            catch (SqliteException ex)
            {
                // ⚠ Itt most NEM dobjuk tovább, csak logolunk és 0-át használunk
                Console.WriteLine($"[WARN] Ratings lekérdezés sikertelen (userId={userId}): {ex.Message}");
                // average = 0; count = 0;  // már úgyis 0-ra vannak inicializálva
            }

            return new UserPublicDto
            {
                Id = user.Id,
                UserName = user.Username,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber ?? string.Empty,
                AdsCount = adsCount,
                AverageRating = average,
                RatingCount = count
            };
        }




        //  aktuális userId int-ként
        private int CurrentUserId
        {
            get
            {
                if (!_current.IsAuthenticated) throw new UnauthorizedAccessException();
                if (!int.TryParse(_current.UserId, out var id))
                    throw new UnauthorizedAccessException("Invalid user id.");
                return id;
            }
        }

        public async Task<UserDto?> GetMeAsync(CancellationToken ct = default)
        {
            var me = await _users.GetByIdAsync(CurrentUserId, ct);
            return me is null ? null : MapToDto(me);
        }

        public async Task<bool> UpdateMeAsync(UpdateUserDto dto, CancellationToken ct = default)
        {
            if (dto is null) throw new ArgumentNullException(nameof(dto));

            var me = await _users.GetByIdAsync(CurrentUserId, ct);
            if (me is null) return false;

            // Egyszerű frissítés – igazítsd a tényleges mezőkhöz!
            if (!string.IsNullOrWhiteSpace(dto.UserName))
                me.Username = dto.UserName.Trim();

            if (!string.IsNullOrWhiteSpace(dto.Email))
                me.Email = dto.Email.Trim();

            await _users.UpdateAsync(me, ct);
            await _uow.SaveChangesAsync(ct);
            return true;
        }

        public async Task<UserDto?> GetByIdAsync(int userId, CancellationToken ct = default)
        {
            // Engedjük: saját magát bárki lekérheti; mást csak Admin
            var isSelf = _current.IsAuthenticated && CurrentUserId == userId;
            if (!isSelf && !_current.IsInRole("Admin"))
                throw new UnauthorizedAccessException();

            var user = await _users.GetByIdAsync(userId, ct);
            return user is null ? null : MapToDto(user);
        }

        public async Task<AdUserDto?> GetByAdToAdAsync(int userId, CancellationToken ct = default)
        {
            User? user = await _users.GetByIdAsync(userId, ct)
                        ?? throw new KeyNotFoundException("A megadott felhasználó nem található.");
            return new AdUserDto
            {
                Id = user.Id,
                UserName = user.Username,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber ?? "",
                Address = user.Address ?? ""
            };
        }

        public async Task<IReadOnlyList<UserDto>> GetAllAsync(CancellationToken ct = default)
        {
            if (!_current.IsInRole("Admin"))
                throw new UnauthorizedAccessException();

            var list = await _users.GetAllAsync(ct);
            return list.Select(MapToDto).ToList();
        }

        public async Task<bool> DeleteAsync(int userId, CancellationToken ct = default)
        {
            if (!_current.IsInRole("Admin"))
                throw new UnauthorizedAccessException();

            var user = await _users.GetByIdAsync(userId, ct);
            if (user is null) return false;

            //ha nem akarjuk hogy admin saját magát törölje:
            if (user.Id == CurrentUserId) throw new InvalidOperationException("Admin cannot delete self.");

            await _users.RemoveAsync(user, ct);
            await _uow.SaveChangesAsync(ct);
            return true;
        }


        private static UserDto MapToDto(User u) => new UserDto
        {
            Id = u.Id,
            UserName = u.Username,
            Email = u.Email,
            Role = u.Role?.Name.ToString() ?? "User"
        };
    }
}
