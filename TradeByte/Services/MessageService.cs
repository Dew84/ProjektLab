using TradeByte.Dtos.Message;
using TradeByte.Models;
using TradeByte.Repositories.Interfaces;
using TradeByte.Services.Interfaces;

namespace TradeByte.Services
{
    public class MessageService : IMessageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConversationRepository _conversationRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;

        public MessageService(IUnitOfWork unitOfWork, IConversationRepository conversationRepository, IUserRepository userRepository, IMessageRepository messageRepository)
        {
            _unitOfWork = unitOfWork;
            _conversationRepository = conversationRepository;
            _userRepository = userRepository;
            _messageRepository = messageRepository;
        }

        public async Task DeleteMessageAsync(int messageId, CancellationToken ct = default)
        {
            Message message = await _messageRepository.GetMessageByIdAsync(messageId, ct)
                ?? throw new KeyNotFoundException($"A megadott üzenet nem található: {messageId}");

            await _messageRepository.DeleteMessage(message, ct);
        }

        public async Task EditMessageAsync(UpdateMessageDto updateMessage, CancellationToken ct = default)
        {
            Message message = await _messageRepository.GetMessageByIdAsync(updateMessage.Id, ct)
                ?? throw new KeyNotFoundException($"A megadott üzenet nem található: {updateMessage.Id}");

            message.Content = updateMessage.Content;
            message.IsRead = updateMessage.IsRead;

            await _messageRepository.ModifyMessage(message, ct);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<MessageDto?> GetMessageByIdAsync(int messageId, CancellationToken ct = default)
        {
            Message message = await _messageRepository.GetMessageByIdAsync(messageId, ct)
                ?? throw new KeyNotFoundException($"A megadott üzenet nem található: {messageId}");
                
            return new MessageDto
            {
                Id = message.Id,
                ConversationId = message.ConversationId,
                SenderId = message.SenderId,
                Content = message.Content,
                SentAt = message.SentAt,
                IsRead = message.IsRead
            };
        }

        public async Task<List<MessageDto>> GetMessagesByConversationIdAsync(int conversationId, CancellationToken ct = default)
        {
            Conversation conversation = await _conversationRepository.GetConversationByIdAsync(conversationId, ct)
                ?? throw new KeyNotFoundException($"A megadott beszélgetés nem található: {conversationId}");

            IEnumerable<Message> messages = await _messageRepository.GetMessagesByConversationId(conversationId, ct);

            return messages.Select(message => new MessageDto
            {
                Id = message.Id,
                ConversationId = message.ConversationId,
                SenderId = message.SenderId,
                Content = message.Content,
                SentAt = message.SentAt,
                IsRead = message.IsRead
            }).ToList();
        }

        public async Task<MessageDto> SendMessageAsync(CreateMessageDto message, CancellationToken ct = default)
        {
            Conversation conversation = await _conversationRepository.GetConversationByIdAsync(message.ConversationId)
                ?? throw new KeyNotFoundException($"A megadott beszélgetés nem található: {message.ConversationId}");
            Message newMessage = new Message
            {
                ConversationId = conversation.Id,
                SenderId = message.SenderId,
                Content = message.Content,
                SentAt = DateTime.UtcNow,
                IsRead = false
            };

            await _messageRepository.AddMessageAsync(newMessage, ct);
            await _unitOfWork.SaveChangesAsync();

            return new MessageDto
            {
                Id = newMessage.Id,
                ConversationId = newMessage.ConversationId,
                SenderId = newMessage.SenderId,
                Content = newMessage.Content,
                SentAt = newMessage.SentAt,
                IsRead = newMessage.IsRead
            };
        }
    }
}