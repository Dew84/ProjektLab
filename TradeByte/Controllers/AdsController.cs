using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TradeByte.Dtos.Ads;
using TradeByte.Dtos.Common;
using TradeByte.Services.Interfaces;

namespace TradeByte.Controllers
{
    /// <summary>
    /// Hirdetések kezelése
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AdsController : ControllerBase
    {
        private readonly IAdService _adService;

        public AdsController(IAdService adService)
        {
            _adService = adService;
        }

        /// <summary>
        /// Hirdetések listázása szűrési lehetőségekkel
        /// </summary>
        /// <param name="keyword">Keresés a címben és leírásban</param>
        /// <param name="categoryId">Szűrés kategória szerint</param>
        /// <param name="minPrice">Minimum ár</param>
        /// <param name="maxPrice">Maximum ár</param>
        /// <param name="sortBy">Rendezés mező (price, title, createdAt)</param>
        /// <param name="sortDesc">Csökkenő rendezés</param>
        /// <param name="page">Oldal száma (1-től kezdődően)</param>
        /// <param name="pageSize">Elemek száma oldalanként</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Lapozott hirdetések listája</returns>
        [HttpGet]
        [ProducesResponseType(typeof(PagedResult<AdDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<PagedResult<AdDto>>> GetAds(
            [FromQuery] string? keyword = null,
            [FromQuery] int? categoryId = null,
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null,
            [FromQuery] string? sortBy = null,
            [FromQuery] bool? sortDesc = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            CancellationToken ct = default)
        {
            var query = new AdListQuery
            {
                Keyword = keyword,
                CategoryId = categoryId,
                MinPrice = minPrice,
                MaxPrice = maxPrice,
                SortBy = sortBy,
                SortDesc = sortDesc,
                Page = page,
                PageSize = pageSize
            };

            var result = await _adService.ListAsync(query, ct);
            return Ok(result);
        }

        /// <summary>
        /// Hirdetés részletes megtekintése
        /// </summary>
        /// <param name="id">Hirdetés azonosítója</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Hirdetés részletei</returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(AdDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AdDto>> GetAd(int id, CancellationToken ct = default)
        {
            // Bejelentkezett felhasználók láthatják az eladó adatait
            var includeSellerData = User.Identity?.IsAuthenticated ?? false;

            var ad = await _adService.GetByIdAsync(id, includeSellerData, ct);
            if (ad == null)
            {
                return NotFound(new { message = "Hirdetés nem található." });
            }

            return Ok(ad);
        }

        /// <summary>
        /// Új hirdetés létrehozása (bejelentkezés szükséges)
        /// </summary>
        /// <param name="dto">Hirdetés adatai</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Létrehozott hirdetés azonosítója</returns>
        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(object), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> CreateAd([FromBody] CreateAdDto dto, CancellationToken ct = default)
        {
            try
            {
                var adId = await _adService.CreateAsync(dto, ct);
                return CreatedAtAction(nameof(GetAd), new { id = adId }, new { id = adId });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Hirdetés módosítása (tulajdonos vagy admin)
        /// </summary>
        /// <param name="id">Hirdetés azonosítója</param>
        /// <param name="dto">Módosított adatok</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Módosítás eredménye</returns>
        [HttpPut("{id:int}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateAd(int id, [FromBody] UpdateAdDto dto, CancellationToken ct = default)
        {
            try
            {
                var success = await _adService.UpdateAsync(id, dto, ct);
                if (!success)
                {
                    return NotFound(new { message = "Hirdetés nem található." });
                }

                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Hirdetés törlése (tulajdonos vagy admin)
        /// </summary>
        /// <param name="id">Hirdetés azonosítója</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Törlés eredménye</returns>
        [HttpDelete("{id:int}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteAd(int id, CancellationToken ct = default)
        {
            try
            {
                var success = await _adService.DeleteAsync(id, ct);
                if (!success)
                {
                    return NotFound(new { message = "Hirdetés nem található." });
                }

                return NoContent();
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
        }

        /// <summary>
        /// Saját hirdetések listázása (bejelentkezés szükséges)
        /// </summary>
        /// <param name="page">Oldal száma</param>
        /// <param name="pageSize">Elemek száma oldalanként</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Saját hirdetések listája</returns>
        [HttpGet("mine")]
        [Authorize]
        [ProducesResponseType(typeof(PagedResult<AdDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<PagedResult<AdDto>>> GetMyAds(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            CancellationToken ct = default)
        {
            try
            {
                var query = new PaginationQuery(page, pageSize);
                var result = await _adService.ListMineAsync(query, ct);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
}