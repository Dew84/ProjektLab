using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TradeByte.Models
{
    public class Conversation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int User1Id { get; set; }
        public int User2Id { get; set; }

        public User? Sender { get; set; }
        public User? Receiver { get; set; }

    }
}