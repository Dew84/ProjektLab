namespace TradeByte.Services
{
    /// <summary>
    /// Az aktuális bejelentkezett felhasználó metaadatai (tokenből/claimből).
    /// Service-ek ezt használják HttpContext helyett, így a logika tesztelhető marad.
    /// </summary>
    public interface ICurrentUser
    {
        /// <summary>Felhasználó egyedi azonosítója a tokenből (sub / nameidentifier). Null, ha anonim.</summary>
        string? UserId { get; }

        /// <summary>Igaz, ha a kérés autentikált .</summary>
        bool IsAuthenticated { get; }

        /// <summary>Igaz, ha a user az adott szerepben van (Admin).</summary>
        bool IsInRole(string role);

        /// <summary> claim olvasás (ha kell). Null, ha nincs ilyen claim.</summary>
        string? GetClaim(string claimTypeOrName);
    }
}
