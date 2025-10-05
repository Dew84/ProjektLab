using System.Collections.Generic;

namespace TradeByte.Dtos.Ads
{
    /// <summary>
    /// Új hirdetés létrehozásához szükséges adatok (input).
    /// </summary>
    public class CreateAdDto
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public decimal Price { get; set; }
        public int UserId { get; set; } 
        public List<int> CategoryIds { get; set; } = new(); // m2m kapcsolat
        //képek?
    }
}
