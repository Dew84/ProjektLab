using TradeByte.Models;

namespace TradeByte.Repositories.Interfaces
{
    public interface IConversationRepository
    {
        Task CreateConversation(Conversation conversation, CancellationToken ct = default);
        Task<Conversation?> GetConversationByParticipantsAsync(int user1Id, int user2Id, CancellationToken ct = default);
        Task<Conversation?> GetConversationByIdAsync(int id, CancellationToken ct = default);
    }
}