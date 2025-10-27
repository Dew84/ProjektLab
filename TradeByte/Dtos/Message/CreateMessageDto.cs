namespace TradeByte.Dtos.Message
{
    public class CreateMessageDto
    {
        public int SenderId { get; set; }
        public int ConversationId { get; set; }
        public required string Content { get; set; }
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
    }
}