using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TradeByte.Models
{
    /// <summary>
    /// Jogosultsági csoportok típusai
    /// </summary>
    public enum RoleType
    {
        Admin,
        User
    }

    /// <summary>
    /// Felhasználói jogosultsági csoportok
    /// </summary>
    public class Role
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// Jogosultsági csoport kódja
        /// </summary>
        public RoleType Key { get; set; }
    }
}
