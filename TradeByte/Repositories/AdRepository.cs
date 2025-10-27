using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TradeByte.Context;                    // AppDbContext
using TradeByte.Dtos.Ads;                   // AdListQuery
using TradeByte.Dtos.Common;                // PaginationQuery, PagedResult<T>
using TradeByte.Models;                     // Classified
using TradeByte.Repositories.Interfaces;    // IAdRepository

namespace TradeByte.Repositories
{
    public class AdRepository : IAdRepository
    {
        private readonly AppDbContext _context;

        public AdRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ExistsAsync(int id, CancellationToken ct = default)
            => await _context.Classifieds.AsNoTracking().AnyAsync(a => a.Id == id, ct);

        public async Task<bool> IsOwnerAsync(int adId, int userId, CancellationToken ct = default)
            => await _context.Classifieds.AsNoTracking()
                   .AnyAsync(a => a.Id == adId && a.UserId == userId, ct);

        public async Task<Classified?> GetByIdAsync(
            int id,
            bool includeUser = false,
            bool includeCategories = false,
            bool includePictures = false,
            bool track = false,
            CancellationToken ct = default)
        {
            IQueryable<Classified> q = _context.Classifieds;

            if (!track) q = q.AsNoTracking();

            if (includeUser)
                q = q.Include(a => a.User);

            if (includeCategories)
                q = q.Include(a => a.Categories);        // m2m

            if (includePictures)
                q = q.Include(a => a.Pictures);

            return await q.FirstOrDefaultAsync(a => a.Id == id, ct);
        }

        public async Task<PagedResult<Classified>> ListAsync(
            AdListQuery query,
            string? sortBy = null,
            bool desc = true,
            CancellationToken ct = default)
        {
            IQueryable<Classified> q = _context.Classifieds.AsNoTracking();

            // kereső: cím + leírás
            if (!string.IsNullOrWhiteSpace(query.Keyword))
            {
                var kw = query.Keyword.Trim();
                q = q.Where(a => a.Title.Contains(kw) || a.Description.Contains(kw));
            }

            // kategória szűrő (m2m)
            if (query.CategoryId.HasValue)
            {
                var catId = query.CategoryId.Value;
                q = q.Where(a => a.Categories.Any(c => c.Id == catId));
            }

            // ár szűrő - MINIMUM
            if (query.MinPrice.HasValue)
            {
                q = q.Where(a => a.Price >= query.MinPrice.Value);
            }

            // ár szűrő - MAXIMUM
            if (query.MaxPrice.HasValue)
            {
                q = q.Where(a => a.Price <= query.MaxPrice.Value);
            }

            var total = await q.CountAsync(ct);

            // lapozás mindig rendezéssel
            q = ApplySorting(q, sortBy, desc);

            var page = Math.Max(1, query.Page);
            var size = Math.Clamp(query.PageSize, 1, 200);

            var items = await q
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync(ct);

            return new PagedResult<Classified>
            {
                Items = items,
                Total = total,
                Page = page,
                PageSize = size
            };
        }

        public async Task<PagedResult<Classified>> ListByUserAsync(
            int userId,
            PaginationQuery query,
            string? sortBy = null,
            bool desc = true,
            CancellationToken ct = default)
        {
            IQueryable<Classified> q = _context.Classifieds
                                                .AsNoTracking()
                                                .Where(a => a.UserId == userId);

            var total = await q.CountAsync(ct);

            q = ApplySorting(q, sortBy, desc);

            var page = Math.Max(1, query.Page);
            var size = Math.Clamp(query.PageSize, 1, 200);

            var items = await q
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync(ct);

            return new PagedResult<Classified>
            {
                Items = items,
                Total = total,
                Page = page,
                PageSize = size
            };
        }

        public Task AddAsync(Classified ad, CancellationToken ct = default)
            => _context.Classifieds.AddAsync(ad, ct).AsTask();

        public Task UpdateAsync(Classified ad, CancellationToken ct = default)
        {
            _context.Classifieds.Update(ad);
            return Task.CompletedTask;
        }

        public Task RemoveAsync(Classified ad, CancellationToken ct = default)
        {
            _context.Classifieds.Remove(ad);
            return Task.CompletedTask;
        }

        private static IQueryable<Classified> ApplySorting(
            IQueryable<Classified> q, string? sortBy, bool desc)
        {
            sortBy = sortBy?.Trim().ToLowerInvariant();

            
            return sortBy switch
            {
                "id" => desc ? q.OrderByDescending(a => a.Id) : q.OrderBy(a => a.Id),
                "price" => desc ? q.OrderByDescending(a => a.Price) : q.OrderBy(a => a.Price),
                "title" => desc ? q.OrderByDescending(a => a.Title) : q.OrderBy(a => a.Title),
                _ => desc ? q.OrderByDescending(a => a.CreatedAt) : q.OrderBy(a => a.CreatedAt)
            };
        }
    }
}
