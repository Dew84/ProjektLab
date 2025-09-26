using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TradeByte.Models; // User

namespace TradeByte.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(int userId, CancellationToken ct = default);
        Task<User?> GetByEmailAsync(string email, CancellationToken ct = default);
        Task<IReadOnlyList<User>> GetAllAsync(CancellationToken ct = default);

        Task AddAsync(User user, CancellationToken ct = default);
        Task RemoveAsync(User user, CancellationToken ct = default);
        Task UpdateAsync(User user, CancellationToken ct = default);
    }
}
