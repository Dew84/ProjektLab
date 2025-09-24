using System.Collections.Generic;

namespace TradeByte.Dtos.Ads
{
    /// <summary>
    /// Meglévő hirdetés frissítéséhez szükséges adatok (input).
    /// </summary>
    public class UpdateAdDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public List<int>? CategoryIds { get; set; }
    }
}
