using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TradeByte.Models;

namespace TradeByte.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IReadOnlyList<Category>> GetAllAsync(CancellationToken ct = default);

        // Meglévő hívások kompatibilitása miatt marad:
        Task<Category?> GetByIdAsync(int id, CancellationToken ct = default);

        // Bővített változat: opcionális tracking és include
        Task<Category?> GetByIdAsync(int id, bool track, bool includeClassifieds, CancellationToken ct = default);

        Task<List<Category>> GetByIdsAsync(IEnumerable<int> ids, CancellationToken ct = default);

        Task<bool> ExistsAsync(int id, CancellationToken ct = default);

        Task AddAsync(Category category, CancellationToken ct = default);
        Task UpdateAsync(Category category, CancellationToken ct = default);
        Task RemoveAsync(Category category, CancellationToken ct = default);

        // Alternatíva, ha stub entitásokat akarunk beköteni
        void AttachRange(IEnumerable<Category> categories);
    }
}
