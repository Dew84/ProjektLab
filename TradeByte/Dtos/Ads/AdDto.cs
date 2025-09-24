using System;
using System.Collections.Generic;

namespace TradeByte.Dtos.Ads
{
    /// <summary>
    /// Publikus hirdetés DTO (amit a kliensnek adunk vissza).
    /// </summary>
    public class AdDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public decimal Price { get; set; }
        public DateTime CreatedAt { get; set; }

        public int UserId { get; set; }                     // eladó azonosító
        public string? SellerDisplayName { get; set; }      // eladó neve

        public List<int> CategoryIds { get; set; } = new();
        public List<string> PictureUrls { get; set; } = new();
    }
}
