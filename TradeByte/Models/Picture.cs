using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TradeByte.Models
{
    public class Picture
    {
        public Picture(string fileName, int classifiedId)
        {
            FileName = fileName;
            ClassifiedId = classifiedId;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// Kép fájlneve
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        /// Képhez tartozó hirdetés id-ja
        /// </summary>
        public int ClassifiedId { get; set; }

        /// <summary>
        /// Képhez tartozó hirdetés
        /// </summary>
        public Classified? Classified { get; set; }        
    }
}

