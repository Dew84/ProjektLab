using Microsoft.EntityFrameworkCore;
using TradeByte.Context;
using TradeByte.Models;
using TradeByte.Repositories.Interfaces;

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _context;
    public CategoryRepository(AppDbContext context) => _context = context;

    public async Task<IReadOnlyList<Category>> GetAllAsync(CancellationToken ct = default) =>
        await _context.Categories
            .AsNoTracking()
            .OrderBy(c => c.Name)
            .ToListAsync(ct);

    public async Task<Category?> GetByIdAsync(int id, CancellationToken ct = default) =>
        await _context.Categories.FirstOrDefaultAsync(c => c.Id == id, ct); // tracked

    // M2M frissítéshez: TRACKELT példányok
    public async Task<List<Category>> GetByIdsAsync(IEnumerable<int> ids, CancellationToken ct = default)
    {
        var list = ids?.Distinct().ToList() ?? new();
        if (list.Count == 0) return new();
        return await _context.Categories
            .Where(c => list.Contains(c.Id))
            .ToListAsync(ct); // tracked by default
    }

    public async Task AddAsync(Category category, CancellationToken ct = default) =>
        await _context.Categories.AddAsync(category, ct);

    public Task UpdateAsync(Category category, CancellationToken ct = default)
    {
        var e = _context.Entry(category);
        if (e.State == EntityState.Detached) _context.Attach(category);
        _context.Entry(category).State = EntityState.Modified;
        return Task.CompletedTask;
    }

    public Task RemoveAsync(Category category, CancellationToken ct = default)
    {
        _context.Categories.Remove(category);
        return Task.CompletedTask;
    }
}
