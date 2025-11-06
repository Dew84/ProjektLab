namespace TradeByte.Dtos.Message
{
    public class UpdateMessageDto
    {
        public int Id { get; set; }
        public required string Content { get; set; }
        public bool IsRead { get; set; } = false;
    }
}