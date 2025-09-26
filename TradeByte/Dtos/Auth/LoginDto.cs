namespace TradeByte.Dtos.Auth
{
    /// <summary>
    /// Bejelentkezéshez szükséges adatok.
    /// </summary>
    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
