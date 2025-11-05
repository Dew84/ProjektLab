using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static TradeByte.Dtos.Rating.RatingDtos;
using TradeByte.Services.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class RatingsController : ControllerBase
{
    private readonly IRatingService _service;
    public RatingsController(IRatingService service) => _service = service;

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RatingSummaryDto>> Rate([FromBody] CreateRatingDto dto, CancellationToken ct)
    {
        var summary = await _service.RateUserAsync(dto, ct);
        return Ok(summary);
    }

    [AllowAnonymous]
    [HttpGet("{userId}/summary")]
    public async Task<ActionResult<RatingSummaryDto>> Summary(int userId, CancellationToken ct)
    {
        var s = await _service.GetSummaryAsync(userId, ct);
        return Ok(s);
    }
}
