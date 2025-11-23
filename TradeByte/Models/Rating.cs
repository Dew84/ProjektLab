using TradeByte.Models;

public class Rating
{
    public int Id { get; set; }

    public int RatedUserId { get; set; }      // Az a felhasználó, akit értékelnek
    public int RaterUserId { get; set; }      // Az a felhasználó, aki értékel

    public int Value { get; set; }            // 1–5 csillag

    // Opcionális: szöveges értékelés (késõbb fejleszthetõ)
    // public string? Comment { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; //hátha kell
    // Navigációs property-k:
    public User RatedUser { get; set; } = null!;
    public User RaterUser { get; set; } = null!;
}
