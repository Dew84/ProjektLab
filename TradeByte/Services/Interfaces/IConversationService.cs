using TradeByte.Dtos.Conversation;

namespace TradeByte.Services.Interfaces
{
    public interface IConversationService
    {
        Task<ConversationDto?> GetConversationByParticipantsAsync(int user1Id, int user2Id, bool createIfNotExists, CancellationToken ct = default);
        Task<IEnumerable<ConversationDto>> GetAllConversationsByUserIdAsync(int userId, CancellationToken ct = default);
    }
}