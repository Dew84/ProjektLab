using System.Threading;
using System.Threading.Tasks;
using TradeByte.Dtos.Common; // PaginationQuery, PagedResult<T>
using TradeByte.Dtos.Ads;    // CreateAdDto, UpdateAdDto, AdDto, AdListQuery

namespace TradeByte.Services.Interfaces
{
    /// <summary>Hirdetések kezelése (CRUD, listázás, saját hirdetések).</summary>
    public interface IAdService
    {
        Task<AdDto?> GetByIdAsync(int adId, bool includeSellerProtectedData, CancellationToken ct = default);

        /// <summary>Publikus böngészés, query-alapú keresés/szűrés.</summary>
        Task<PagedResult<AdDto>> ListAsync(AdListQuery query, CancellationToken ct = default);

        /// <summary>Bejelentkezett user saját hirdetései.</summary>
        Task<PagedResult<AdDto>> ListMineAsync(PaginationQuery query, CancellationToken ct = default);

        Task<int> CreateAsync(CreateAdDto dto, CancellationToken ct = default);
        Task<bool> UpdateAsync(int adId, UpdateAdDto dto, CancellationToken ct = default);
        Task<bool> DeleteAsync(int adId, CancellationToken ct = default);

        Task<PagedResult<AdDto>> ListByUserAsync(int userId, PaginationQuery query, CancellationToken ct = default);
    }
}
