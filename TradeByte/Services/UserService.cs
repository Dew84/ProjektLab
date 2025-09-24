using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TradeByte.Services.Interfaces;
using TradeByte.Repositories.Interfaces;
using TradeByte.Dtos.Users;
using TradeByte.Models;

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

        public UserService(IUserRepository users, IUnitOfWork uow, ICurrentUser current)
        {
            _users = users;
            _uow = uow;
            _current = current;
        }

        //  aktuális userId int-ként (ICurrentUser.UserId string -> int)
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

        // ---- Mapping ----
        private static UserDto MapToDto(User u) => new UserDto
        {
            Id = u.Id,
            UserName = u.Username,
            Email = u.Email,
            Role = u.Role?.Name.ToString() ?? "User"
        };
    }
}
