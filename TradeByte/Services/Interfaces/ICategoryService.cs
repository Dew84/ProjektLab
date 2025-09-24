using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TradeByte.Dtos;
using TradeByte.Dtos.Categories; // CategoryDto, CreateCategoryDto, UpdateCategoryDto

namespace TradeByte.Services.Interfaces
{
    /// <summary>Kategóriák kezelése. CRUD: admin-only; listázás: publikus.</summary>
    public interface ICategoryService
    {
        Task<IReadOnlyList<CategoryDto>> GetAllAsync(CancellationToken ct = default);
        Task<int> CreateAsync(CreateCategoryDto dto, CancellationToken ct = default);
        Task<bool> UpdateAsync(int id, UpdateCategoryDto dto, CancellationToken ct = default);
        Task<bool> DeleteAsync(int id, CancellationToken ct = default);
    }
}
