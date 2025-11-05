using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TradeByte.Dtos.Users;
using TradeByte.Services.Interfaces;

namespace TradeByte.Controllers
{
    /// <summary>
    /// Felhasználók kezelése
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Saját profil megtekintése (bejelentkezés szükséges)
        /// </summary>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Felhasználó adatai</returns>
        [HttpGet("me")]
        [Authorize]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserDto>> GetMe(CancellationToken ct = default)
        {
            try
            {
                var user = await _userService.GetMeAsync(ct);
                if (user == null)
                {
                    return NotFound(new { message = "Felhasználó nem található." });
                }

                return Ok(user);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Saját profil módosítása (bejelentkezés szükséges)
        /// </summary>
        /// <param name="dto">Módosított adatok</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Módosítás eredménye</returns>
        [HttpPut("me")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateMe([FromBody] UpdateUserDto dto, CancellationToken ct = default)
        {
            try
            {
                var success = await _userService.UpdateMeAsync(dto, ct);
                if (!success)
                {
                    return NotFound(new { message = "Felhasználó nem található." });
                }

                return NoContent();
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
        /// Felhasználó lekérése azonosító alapján (saját vagy admin jogosultság szükséges)
        /// </summary>
        /// <param name="id">Felhasználó azonosítója</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Felhasználó adatai</returns>
        [HttpGet("{id:int}")]
        [Authorize]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserDto>> GetUser(int id, CancellationToken ct = default)
        {
            try
            {
                var user = await _userService.GetByIdAsync(id, ct);
                if (user == null)
                {
                    return NotFound(new { message = "Felhasználó nem található." });
                }

                return Ok(user);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
        }

        /// <summary>
        /// Felhasználó lekérése hirdetés adatai miatt
        /// </summary>
        /// <param name="id">Felhasználó azonosítója</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Felhasználó adatai</returns>
        [HttpGet("public/{id:int}")]
        [ProducesResponseType(typeof(AdUserDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserDto>> GetUserToAd(int id, CancellationToken ct = default)
        {
            AdUserDto? user = await _userService.GetByAdToAdAsync(id, ct);
            
            if (user == null)
            {
                return NotFound(new { message = "Felhasználó nem található." });
            }

            return Ok(user);
            
        }

        /// <summary>
        /// Összes felhasználó listázása (admin jogosultság szükséges)
        /// </summary>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Felhasználók listája</returns>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(typeof(IReadOnlyList<UserDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<IReadOnlyList<UserDto>>> GetAllUsers(CancellationToken ct = default)
        {
            try
            {
                var users = await _userService.GetAllAsync(ct);
                return Ok(users);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
        }

        /// <summary>
        /// Felhasználó törlése (admin jogosultság szükséges)
        /// </summary>
        /// <param name="id">Felhasználó azonosítója</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Törlés eredménye</returns>
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteUser(int id, CancellationToken ct = default)
        {
            try
            {
                var success = await _userService.DeleteAsync(id, ct);
                if (!success)
                {
                    return NotFound(new { message = "Felhasználó nem található." });
                }

                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet("public/{id}")]
        public async Task<ActionResult<UserPublicDto>> GetPublicById(int id, CancellationToken ct = default)
        {
            var result = await _userService.GetPublicByIdAsync(id, ct);
            if (result == null) return NotFound();
            return Ok(result);
        }

    }
}