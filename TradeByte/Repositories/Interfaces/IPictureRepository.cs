using TradeByte.Models;     

namespace TradeByte.Repositories.Interfaces
{
    /// <summary>
    /// Hirdetésekhez tartozó képek adatelérése EF Core-on keresztül.
    /// </summary>
    public interface IPictureRepository
    {
        Task<Picture?> GetByIdAsync(
            int id,            
            CancellationToken ct = default);
        Task<Picture?> GetByFileNameAsync(
            string fileName,            
            CancellationToken ct = default);

        Task<IList<Picture>> ListByAdAsync(
            int adId,
            CancellationToken ct = default);

        Task AddAsync(Picture pict, CancellationToken ct = default);
        Task RemoveAsync(Picture pict, CancellationToken ct = default);
    }
}
