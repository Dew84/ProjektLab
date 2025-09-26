using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TradeByte.Dtos.Categories;
using TradeByte.Services.Interfaces;

namespace TradeByte.Controllers
{
    /// <summary>
    /// Kategóriák kezelése
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        /// <summary>
        /// Összes kategória listázása
        /// </summary>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Kategóriák listája</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IReadOnlyList<CategoryDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IReadOnlyList<CategoryDto>>> GetCategories(CancellationToken ct = default)
        {
            var categories = await _categoryService.GetAllAsync(ct);
            return Ok(categories);
        }

        /// <summary>
        /// Új kategória létrehozása (admin jogosultság szükséges)
        /// </summary>
        /// <param name="dto">Kategória adatai</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Létrehozott kategória azonosítója</returns>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(typeof(object), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> CreateCategory([FromBody] CreateCategoryDto dto, CancellationToken ct = default)
        {
            try
            {
                var categoryId = await _categoryService.CreateAsync(dto, ct);
                return CreatedAtAction(nameof(GetCategories), new { id = categoryId });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
        }

        /// <summary>
        /// Kategória módosítása (admin jogosultság szükséges)
        /// </summary>
        /// <param name="id">Kategória azonosítója</param>
        /// <param name="dto">Módosított adatok</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Módosítás eredménye</returns>
        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryDto dto, CancellationToken ct = default)
        {
            try
            {
                var success = await _categoryService.UpdateAsync(id, dto, ct);
                if (!success)
                {
                    return NotFound(new { message = "Kategória nem található." });
                }

                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
        }

        /// <summary>
        /// Kategória törlése (admin jogosultság szükséges)
        /// </summary>
        /// <param name="id">Kategória azonosítója</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Törlés eredménye</returns>
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteCategory(int id, CancellationToken ct = default)
        {
            try
            {
                var success = await _categoryService.DeleteAsync(id, ct);
                if (!success)
                {
                    return NotFound(new { message = "Kategória nem található." });
                }

                return NoContent();
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
        }
    }
}