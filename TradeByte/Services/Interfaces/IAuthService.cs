using System.Threading;
using System.Threading.Tasks;
using TradeByte.Dtos.Auth; // LoginDto, RegisterDto, AuthResultDto

namespace TradeByte.Services.Interfaces
{
    /// <summary>Hitelesítés + JWT kiadás.</summary>
    public interface IAuthService
    {
        Task<AuthResultDto> RegisterAsync(RegisterDto dto, CancellationToken ct = default);
        Task<AuthResultDto> LoginAsync(LoginDto dto, CancellationToken ct = default);
    }
}
