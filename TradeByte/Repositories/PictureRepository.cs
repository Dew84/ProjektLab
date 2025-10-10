using Microsoft.EntityFrameworkCore;
using TradeByte.Context;                    // AppDbContext
using TradeByte.Dtos.Ads;                   // AdListQuery
using TradeByte.Dtos.Common;                // PaginationQuery, PagedResult<T>
using TradeByte.Models;                     // Classified
using TradeByte.Repositories.Interfaces;    // IAdRepository

namespace TradeByte.Repositories
{
    public class PictureRepository : IPictureRepository
    {
        private readonly AppDbContext _context;

        public PictureRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Picture?> GetByIdAsync(
            int id,
            CancellationToken ct = default)
        {
            return await _context.Pictures
                                 .AsNoTracking()
                                 .FirstOrDefaultAsync(p => p.Id == id, ct);
        }
        public async Task<Picture?> GetByFileNameAsync(
            string fileName,
            CancellationToken ct = default)
        {
            return await _context.Pictures
                                 .AsNoTracking()
                                 .FirstOrDefaultAsync(p => p.FileName == fileName, ct);
        }

        public async Task<IList<Picture>> ListByAdAsync(
            int adId,
            CancellationToken ct = default)
        {
            return await _context.Pictures
                                 .AsNoTracking()
                                 .Where(x => x.ClassifiedId == adId)
                                 .ToListAsync(ct);
        }

        public async Task AddAsync(Picture pict, CancellationToken ct = default)
        {
            await _context.Pictures.AddAsync(pict, ct);
        }


        public Task RemoveAsync(Picture pict, CancellationToken ct = default)
        {
            _context.Pictures.Remove(pict);
            return Task.CompletedTask;
        }

    }
}
