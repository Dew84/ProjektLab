namespace TradeByte.Dtos.Users
{
    public class UserPublicDto
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;

        // publikus legyen vagy ne?
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;

        //public string City { get; set; } = string.Empty;

        public int AdsCount { get; set; }           // hirdetések száma

        public double AverageRating { get; set; }   // értékelési átlag (0..5)
        public int RatingCount { get; set; }        // hány értékelés érkezett
        
    }
}
