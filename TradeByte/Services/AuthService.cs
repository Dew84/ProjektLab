using System;
using System.Linq;
using System.Text;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using TradeByte.Dtos.Auth;
using TradeByte.Models;
using TradeByte.Repositories.Interfaces;
using TradeByte.Services.Interfaces;

namespace TradeByte.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _users;
        private readonly IUnitOfWork _uow;
        private readonly IConfiguration _config;

        public AuthService(IUserRepository users, IUnitOfWork uow, IConfiguration config)
        {
            _users = users;
            _uow = uow;
            _config = config;
        }

        public async Task<AuthResultDto> RegisterAsync(RegisterDto dto, CancellationToken ct = default)
        {
            // 1) email foglaltság
            var existing = await _users.GetByEmailAsync(dto.Email, ct);
            if (existing is not null)
                throw new InvalidOperationException("Ezzel az e-mail címmel már van felhasználó.");

            // 2) jelszó hash
            var hash = HashPassword(dto.Password);

            // 3) alap user szerep (konfigból) – seedeld előre a Roles táblát
            var defaultRoleId = _config.GetValue<int>("DefaultUserRoleId", 2);

            var user = new User
            {
                Username = dto.UserName.Trim(),
                Email = dto.Email.Trim().ToLowerInvariant(),
                PasswordHash = hash,
                RoleId = defaultRoleId
            };

            await _users.AddAsync(user, ct);
            await _uow.SaveChangesAsync(ct);

            // 4) token
            var token = CreateJwt(user);

            return new AuthResultDto
            {
                Token = token,
                UserId = user.Id,
                UserName = user.Username,
                Email = user.Email
            };
        }

        public async Task<AuthResultDto> LoginAsync(LoginDto dto, CancellationToken ct = default)
        {
            var user = await _users.GetByEmailAsync(dto.Email.Trim().ToLowerInvariant(), ct);
            if (user is null || !VerifyPassword(dto.Password, user.PasswordHash))
                throw new UnauthorizedAccessException("Hibás e-mail vagy jelszó.");

            var token = CreateJwt(user);

            return new AuthResultDto
            {
                Token = token,
                UserId = user.Id,
                UserName = user.Username,
                Email = user.Email
            };
        }

        //PBKDF2 + JWT

        private static string HashPassword(string password)
        {
            using var rng = RandomNumberGenerator.Create();
            var salt = new byte[16];
            rng.GetBytes(salt);

            using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100_000, HashAlgorithmName.SHA256);
            var hash = pbkdf2.GetBytes(32);

            return Convert.ToBase64String(salt) + ":" + Convert.ToBase64String(hash);
        }

        private static bool VerifyPassword(string password, string stored)
        {
            var parts = stored.Split(':');
            if (parts.Length != 2) return false;

            var salt = Convert.FromBase64String(parts[0]);
            var storedHash = Convert.FromBase64String(parts[1]);

            using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100_000, HashAlgorithmName.SHA256);
            var candidate = pbkdf2.GetBytes(32);

            return CryptographicOperations.FixedTimeEquals(candidate, storedHash);
        }


        private string CreateJwt(User user)
        {
            var key = _config["Jwt:Key"] ?? throw new InvalidOperationException("Missing Jwt:Key");
            var issuer = _config["Jwt:Issuer"] ?? "TradeByte";
            var audience = _config["Jwt:Audience"] ?? "TradeByteClient";
            var expiresMinutes = _config.GetValue<int>("Jwt:ExpiresMinutes", 120);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username ?? string.Empty),
                new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
                //itt szöveges role claim kelljen az Authorize(Roles="Admin") miatt
                new Claim(ClaimTypes.Role, (user.Role?.Key.ToString() ?? "User"))
            };

            var creds = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
