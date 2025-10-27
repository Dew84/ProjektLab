using TradeByte.Dtos.Conversation;

namespace TradeByte.Services.Interfaces
{
    public interface IConversationService
    {
        Task<ConversationDto> CreateConversationAsync(CreateConversationDto conversationDto, CancellationToken ct = default);
        Task<ConversationDto?> GetConversationByParticipantsAsync(int user1Id, int user2Id, CancellationToken ct = default);
    }
}