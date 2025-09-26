namespace TradeByte.Dtos.Auth
{
    /// <summary>
    /// Auth eredmény: JWT token és a felhasználó alapadatai.
    /// </summary>
    public class AuthResultDto
    {
        public string Token { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
