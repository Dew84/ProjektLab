using System.Threading;
using System.Threading.Tasks;
using TradeByte.Models;

namespace TradeByte.Repositories.Interfaces
{
    public interface IRatingRepository
    {
        Task AddOrUpdateAsync(Rating rating, CancellationToken ct = default);
        Task<Rating?> GetByUsersAsync(int raterId, int ratedId, CancellationToken ct = default);
        Task<double> GetAverageForUserAsync(int userId, CancellationToken ct = default);
        Task<int> GetCountForUserAsync(int userId, CancellationToken ct = default);
    }
}
