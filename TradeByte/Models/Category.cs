using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TradeByte.Models
{
    /// <summary>
    /// Kategóriák adatai
    /// </summary>
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// Kategória neve
        /// </summary>
        public required string Name { get; set; }
    }
}
