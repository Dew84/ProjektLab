using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace TradeByte.Services
{
    /// <summary>
    /// HttpContext-ből olvasott aktuális felhasználó.
    /// </summary>
    public sealed class CurrentUser : ICurrentUser
    {
        private readonly IHttpContextAccessor _http;
        private string? _userId;   // per-request cache
        private bool? _isAuth;

        public CurrentUser(IHttpContextAccessor httpContextAccessor)
        {
            _http = httpContextAccessor;
        }

        private ClaimsPrincipal? Principal => _http.HttpContext?.User;

        public bool IsAuthenticated
        {
            get
            {
                _isAuth ??= Principal?.Identity?.IsAuthenticated ?? false;
                return _isAuth.Value;
            }
        }

        public string? UserId
        {
            get
            {
                if (_userId != null) return _userId;
                var user = Principal;
                if (user == null) return null;


                _userId =
                    user.FindFirstValue(ClaimTypes.NameIdentifier) ??
                    user.FindFirst("sub")?.Value ??
                    user.FindFirst("userid")?.Value; 

                return _userId;
            }
        }

        public bool IsInRole(string role)
        {
            var user = Principal;
            return user?.IsInRole(role) ?? false;
        }

        public string? GetClaim(string claimTypeOrName)
        {
            var user = Principal;
            if (user is null) return null;

            // Elfogad mind szabványos, mind egyedi claim neveket
            return user.FindFirst(claimTypeOrName)?.Value;
        }
    }
}
