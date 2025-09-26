using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TradeByte.Models
{
    /// <summary>
    /// Hirdetések adatai
    /// </summary>
    public class Classified
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// Hirdetés címe
        /// </summary>
        public required string Title { get; set; }

        /// <summary>
        /// Hirdetés leírása
        /// </summary>
        public required string Description { get; set; }

        /// <summary>
        /// Termék ára
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// Hirdetés létrehozásának időpontja 
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Hirdetést létrehozó felhasználó id-ja
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Hirdetés képei
        /// </summary>
        public List<Picture> Pictures { get; set; } = new List<Picture>();

        /// <summary>
        /// Many-to-many kapcsolat a kategóriákkal
        /// </summary>
        public List<Category> Categories { get; set; } = new List<Category>();

        /// <summary>
        /// Hirdetést létrehozó felhasználó
        /// </summary>
        public User User { get; set; } = null!;
    }
}