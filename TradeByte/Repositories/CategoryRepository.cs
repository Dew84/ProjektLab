using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TradeByte.Context;
using TradeByte.Models;
using TradeByte.Repositories.Interfaces;

namespace TradeByte.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _context;
        public CategoryRepository(AppDbContext context) => _context = context;

        public async Task<IReadOnlyList<Category>> GetAllAsync(CancellationToken ct = default) =>
            await _context.Categories
                          .AsNoTracking()
                          .OrderBy(c => c.Name)
                          .ToListAsync(ct);

        // tracked -> jó Update/Delete-hez
        public async Task<Category?> GetByIdAsync(int id, CancellationToken ct = default) =>
            await _context.Categories.FirstOrDefaultAsync(c => c.Id == id, ct);

        // Bővített overload: track & include flag-ekkel
        public async Task<Category?> GetByIdAsync(int id, bool track, bool includeClassifieds, CancellationToken ct = default)
        {
            IQueryable<Category> q = _context.Categories;

            if (!track) q = q.AsNoTracking();

            
            
            if (includeClassifieds) q = q.Include(c => c.Classifieds);

            return await q.FirstOrDefaultAsync(c => c.Id == id, ct);
        }

        // M2M frissítéshez: TRACKELT példányok
        public async Task<List<Category>> GetByIdsAsync(IEnumerable<int> ids, CancellationToken ct = default)
        {
            var list = ids?.Distinct().ToList() ?? new();
            if (list.Count == 0) return new();
            return await _context.Categories
                                 .Where(c => list.Contains(c.Id))
                                 .ToListAsync(ct); // tracked by default
        }

        public async Task<bool> ExistsAsync(int id, CancellationToken ct = default) =>
            await _context.Categories.AsNoTracking().AnyAsync(c => c.Id == id, ct);

        public async Task AddAsync(Category category, CancellationToken ct = default) =>
            await _context.Categories.AddAsync(category, ct);

        public Task UpdateAsync(Category category, CancellationToken ct = default)
        {
            _context.Categories.Update(category);
            return Task.CompletedTask;
        }

        public Task RemoveAsync(Category category, CancellationToken ct = default)
        {
            _context.Categories.Remove(category);
            return Task.CompletedTask;
        }

        public void AttachRange(IEnumerable<Category> categories)
        {
            // Hasznos lehet, ha stub entitásokat (csak Id-vel) akarsz hozzákötni m2m-hez
            _context.AttachRange(categories);
        }
    }
}
