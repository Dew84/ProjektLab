using System.Reflection.Metadata.Ecma335;
using System.Runtime.CompilerServices;
using TradeByte.Dtos.Ads;
using TradeByte.Dtos.Conversation;
using TradeByte.Models;
using TradeByte.Repositories.Interfaces;
using TradeByte.Services.Interfaces;

namespace TradeByte.Services
{
    public class ConversationService : IConversationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConversationRepository _conversationRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;
        public ConversationService(IUnitOfWork unitOfWork, IConversationRepository conversationRepository, IUserRepository userRepository, IMessageRepository messageRepository)
        {
            _unitOfWork = unitOfWork;
            _conversationRepository = conversationRepository;
            _userRepository = userRepository;
            _messageRepository = messageRepository;
        }

        public async Task<IEnumerable<ConversationDto>> GetAllConversationsByUserIdAsync(int userId, CancellationToken ct = default)
        {
            IEnumerable<Conversation> conversations = await _conversationRepository.GetAllConversationsByUserIdAsync(userId, ct);

            List<ConversationDto> result = new();
            foreach (Conversation c in conversations)
            {
                IEnumerable<Message> messages = await _messageRepository.GetMessagesByConversationId(c.Id, ct);
                bool hasNewMessage = messages.Any(x => x.IsRead == false && x.SenderId != userId);

                result.Add(new ConversationDto
                {
                    Id = c.Id,
                    User1Id = c.User1Id,
                    User2Id = c.User2Id,
                    HasNewMessage = hasNewMessage
                });
            }

            return result;
        }

        public async Task<ConversationDto?> GetConversationByParticipantsAsync(int user1Id, int user2Id, bool createIfNotExists, CancellationToken ct = default)
        {
            Conversation? conversation = await _conversationRepository.GetConversationByParticipantsAsync(user1Id, user2Id, ct);
            if (conversation == null)
            {
                if (!createIfNotExists)
                {
                    return null;
                }

                conversation = new Conversation
                {
                    User1Id = user1Id,
                    User2Id = user2Id
                };
                await _conversationRepository.CreateConversation(conversation, ct);
                await _unitOfWork.SaveChangesAsync(ct);
            }

            return new ConversationDto
            {
                Id = conversation.Id,
                User1Id = conversation.User1Id,
                User2Id = conversation.User2Id
            };
        }

        public async Task<bool> GetNewMessagesExistAsync(int userId, CancellationToken ct = default)
        {
            bool result = false;
            IEnumerable<Conversation> conversations = await _conversationRepository.GetAllConversationsByUserIdAsync(userId, ct);
            for (int i = 0; i < conversations.Count(); i++)
            {
                IEnumerable<Message> messages = await _messageRepository.GetMessagesByConversationId(conversations.ElementAt(i).Id);
                result = messages.Where(x => x.IsRead == false && x.SenderId != userId).Any();
                if (result)
                {
                    break;
                }
            }
            return result;
        }

        public async Task<bool> UpdateAllMessageByUserId(
            int conversationId,
            int userId,
            CancellationToken ct = default)
        {
            Conversation conversation = await _conversationRepository
                .GetConversationByIdAsync(conversationId, ct)
                    ?? throw new NullReferenceException("A megadott beszélgetés nem található");

            IEnumerable<Message> messages = await _messageRepository.
                GetMessagesByConversationId(conversation.Id, ct);

            List<Message> relevantMessages = messages.Where(x => x.SenderId == userId).ToList();

            foreach (Message item in relevantMessages)
            {
                item.IsRead = true;
                await _messageRepository.ModifyMessage(item, ct);
            }

            await _unitOfWork.SaveChangesAsync(ct);
            return true;
        }
    }
}