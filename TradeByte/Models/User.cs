using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TradeByte.Models
{
    /// <summary>
    /// Felhasználói fiók adatai
    /// </summary>
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// Felhasználónév
        /// </summary>
        [Required]
        public required string Username { get; set; }

        /// <summary>
        /// Email cím
        /// </summary>
        [Required]
        public required string Email { get; set; }

        /// <summary>
        /// Jelszó hash-elve
        /// </summary>
        [Required]
        public required string PasswordHash { get; set; }

        /// <summary>
        /// telefonszám
        /// </summary>
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Cím
        /// </summary>
        public string? Address { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int RoleId { get; set; }

        /// <summary>
        /// Felhasználó jogosultsági csoportja
        /// </summary>
        public Role Role { get; set; }
    }
}
