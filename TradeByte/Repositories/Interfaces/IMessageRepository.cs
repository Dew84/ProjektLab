using TradeByte.Models;

namespace TradeByte.Repositories.Interfaces
{
    public interface IMessageRepository
    {
        Task AddMessageAsync(Message message, CancellationToken ct = default);
        Task DeleteMessage(Message message, CancellationToken ct = default);
        Task ModifyMessage(Message message, CancellationToken ct = default);
        Task<Message?> GetMessageByIdAsync(int messageId, CancellationToken ct = default);
        Task<IEnumerable<Message>> GetMessagesByConversationId(int conversationId, CancellationToken ct = default);
    }
}