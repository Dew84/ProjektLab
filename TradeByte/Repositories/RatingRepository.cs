using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TradeByte.Context;
using TradeByte.Models;
using TradeByte.Repositories.Interfaces;

namespace TradeByte.Repositories
{
    public class RatingRepository : IRatingRepository
    {
        private readonly AppDbContext _context;
        public RatingRepository(AppDbContext context) => _context = context;

        public async Task AddOrUpdateAsync(Rating rating, CancellationToken ct = default)
        {
            var existing = await _context.Ratings
                .FirstOrDefaultAsync(r => r.RaterUserId == rating.RaterUserId &&
                                          r.RatedUserId == rating.RatedUserId, ct);
            if (existing != null)
            {
                existing.Value = rating.Value;
                // existing.Comment = rating.Comment;
            }
            else
            {
                await _context.Ratings.AddAsync(rating, ct);
            }
        }

        public Task<Rating?> GetByUsersAsync(int raterId, int ratedId, CancellationToken ct = default)
            => _context.Ratings.FirstOrDefaultAsync(r => r.RaterUserId == raterId &&
                                                         r.RatedUserId == ratedId, ct);

        public async Task<double> GetAverageForUserAsync(int userId, CancellationToken ct = default)
            => await _context.Ratings
                   .Where(r => r.RatedUserId == userId)
                   .AverageAsync(r => (double?)r.Value, ct) ?? 0.0;

        public Task<int> GetCountForUserAsync(int userId, CancellationToken ct = default)
            => _context.Ratings.CountAsync(r => r.RatedUserId == userId, ct);
    }
}
