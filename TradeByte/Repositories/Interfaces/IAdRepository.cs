using System.Threading;
using System.Threading.Tasks;
using TradeByte.Models;          // Classified
using TradeByte.Dtos.Common;     // PaginationQuery, PagedResult<T>
using TradeByte.Dtos.Ads;        // AdListQuery

namespace TradeByte.Repositories.Interfaces
{
    /// <summary>
    /// Hirdetések (Classified) adatelérése EF Core-on keresztül. Üzleti logika itt nincs.
    /// </summary>
    public interface IAdRepository
    {
        Task<bool> ExistsAsync(int id, CancellationToken ct = default);

        Task<bool> IsOwnerAsync(int adId, int userId, CancellationToken ct = default);

        Task<Classified?> GetByIdAsync(
            int id,
            bool includeUser = false,
            bool includeCategories = false,
            bool includePictures = false,
            bool track = false,
            CancellationToken ct = default);

        Task<PagedResult<Classified>> ListAsync(
            AdListQuery query,
            string? sortBy = null,
            bool desc = true,
            CancellationToken ct = default);

        Task<PagedResult<Classified>> ListByUserAsync(
            int userId,
            PaginationQuery query,
            string? sortBy = null,
            bool desc = true,
            CancellationToken ct = default);

        Task AddAsync(Classified ad, CancellationToken ct = default);
        Task UpdateAsync(Classified ad, CancellationToken ct = default);
        Task RemoveAsync(Classified ad, CancellationToken ct = default);
    }
}
