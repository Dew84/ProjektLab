using System.Threading;
using System.Threading.Tasks;
using TradeByte.Dtos.Rating;
using static TradeByte.Dtos.Rating.RatingDtos;

namespace TradeByte.Services.Interfaces
{
    public interface IRatingService
    {
        Task<RatingSummaryDto> RateUserAsync(CreateRatingDto dto, CancellationToken ct = default);
        Task<RatingSummaryDto> GetSummaryAsync(int userId, CancellationToken ct = default);
    }
}
