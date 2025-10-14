
using TradeByte.Dtos.Common;

namespace TradeByte.Services.Interfaces
{
    /// <summary>Hírdetésekhez tartozó képek kezelése (CRUD, listázás, saját hirdetések).</summary>
    public interface IPictureService
    {        
        Task<IList<IFormFile>> ListAsync(int adId, CancellationToken ct = default);        
        Task<bool> UploadAsync(IList<IFormFile> files, int adId, CancellationToken ct = default);
        Task<bool> DeleteByAdIdAsync(int adId, CancellationToken ct = default);
        Task<bool> DeleteAsync(string pictName, CancellationToken ct = default);
    }
}
