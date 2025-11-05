using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TradeByte.Dtos.Users; // UserDto, UpdateUserDto

namespace TradeByte.Services.Interfaces
{
    /// <summary>Felhasználói műveletek. Admin-only jelölve.</summary>
    public interface IUserService
    {
        Task<UserDto?> GetByIdAsync(int userId, CancellationToken ct = default); // int
        Task<AdUserDto?> GetByAdToAdAsync(int userId, CancellationToken ct = default);
        Task<UserDto?> GetMeAsync(CancellationToken ct = default);
        Task<bool> UpdateMeAsync(UpdateUserDto dto, CancellationToken ct = default);

        /// <summary>Admin-only: összes felhasználó listázása.</summary>
        Task<IReadOnlyList<UserDto>> GetAllAsync(CancellationToken ct = default);

        /// <summary>Admin-only: felhasználó törlése.</summary>
        Task<bool> DeleteAsync(int userId, CancellationToken ct = default); // int
        // Felhasználó nyilvános adatai (pl. profiloldalhoz)
        Task<UserPublicDto?> GetPublicByIdAsync(int userId, CancellationToken ct = default);
    }
}
