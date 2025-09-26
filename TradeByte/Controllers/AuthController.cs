using Microsoft.AspNetCore.Mvc;
using TradeByte.Dtos.Auth;
using TradeByte.Services.Interfaces;

namespace TradeByte.Controllers
{
    /// <summary>
    /// Felhasználói hitelesítés és regisztráció
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        /// <summary>
        /// Új felhasználó regisztrálása
        /// </summary>
        /// <param name="dto">Regisztrációs adatok</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Sikeres regisztráció esetén JWT token</returns>
        [HttpPost("register")]
        [ProducesResponseType(typeof(AuthResultDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<AuthResultDto>> Register([FromBody] RegisterDto dto, CancellationToken ct = default)
        {
            try
            {
                var result = await _authService.RegisterAsync(dto, ct);
                return CreatedAtAction(nameof(Register), result);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Felhasználó bejelentkezése
        /// </summary>
        /// <param name="dto">Bejelentkezési adatok</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Sikeres bejelentkezés esetén JWT token</returns>
        [HttpPost("login")]
        [ProducesResponseType(typeof(AuthResultDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<AuthResultDto>> Login([FromBody] LoginDto dto, CancellationToken ct = default)
        {
            try
            {
                var result = await _authService.LoginAsync(dto, ct);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}