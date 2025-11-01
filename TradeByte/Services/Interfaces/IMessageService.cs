using TradeByte.Dtos.Message;
using TradeByte.Models;

namespace TradeByte.Services.Interfaces
{
    public interface IMessageService
    {
        Task<MessageDto> SendMessageAsync(CreateMessageDto message, CancellationToken ct = default);
        Task DeleteMessageAsync(int messageId, CancellationToken ct = default);
        Task EditMessageAsync(UpdateMessageDto updateMessage, CancellationToken ct = default);
        Task<MessageDto?> GetMessageByIdAsync(int messageId, CancellationToken ct = default);
        Task<List<MessageDto>> GetMessagesByConversationIdAsync(int conversationId, CancellationToken ct = default);
    }
}