using System;
using System.Threading;
using System.Threading.Tasks;
using TradeByte.Dtos.Rating;
using TradeByte.Models;
using TradeByte.Repositories.Interfaces;
using TradeByte.Services.Interfaces;
using static TradeByte.Dtos.Rating.RatingDtos;

namespace TradeByte.Services
{
    public class RatingService : IRatingService
    {
        private readonly IRatingRepository _ratings;
        private readonly IUnitOfWork _uow;
        private readonly ICurrentUser _current;

        public RatingService(IRatingRepository ratings, IUnitOfWork uow, ICurrentUser current)
        {
            _ratings = ratings;
            _uow = uow;
            _current = current;
        }

        private int CurrentUserId
        {
            get
            {
                if (!_current.IsAuthenticated) throw new UnauthorizedAccessException();
                if (!int.TryParse(_current.UserId, out var id))
                    throw new UnauthorizedAccessException("Invalid user id.");
                return id;
            }
        }

        public async Task<RatingSummaryDto> RateUserAsync(CreateRatingDto dto, CancellationToken ct = default)
        {
            var raterId = CurrentUserId;

            if (dto.RatedUserId == raterId)
                throw new InvalidOperationException("Saját magadat nem értékelheted.");

            if (dto.Value < 1 || dto.Value > 5)
                throw new ArgumentOutOfRangeException(nameof(dto.Value), "Az értékelés 1 és 5 közötti egész lehet.");

            var rating = new Rating
            {
                RaterUserId = raterId,
                RatedUserId = dto.RatedUserId,
                Value = dto.Value,
                // Comment = dto.Comment
            };

            await _ratings.AddOrUpdateAsync(rating, ct);
            await _uow.SaveChangesAsync(ct);

            return await GetSummaryAsync(dto.RatedUserId, ct);
        }

        public async Task<RatingSummaryDto> GetSummaryAsync(int userId, CancellationToken ct = default)
        {
            var avg = await _ratings.GetAverageForUserAsync(userId, ct);
            var cnt = await _ratings.GetCountForUserAsync(userId, ct);
            return new RatingSummaryDto { Average = avg, Count = cnt };
        }
    }
}
