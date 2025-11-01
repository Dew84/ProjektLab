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
        public ConversationService(IUnitOfWork unitOfWork, IConversationRepository conversationRepository, IUserRepository userRepository)
        {
            _unitOfWork = unitOfWork;
            _conversationRepository = conversationRepository;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<ConversationDto>> GetAllConversationsByUserIdAsync(int userId, CancellationToken ct = default)
        {
            IEnumerable<Conversation> conversations = await _conversationRepository.GetAllConversationsByUserIdAsync(userId, ct);
            return conversations.Select(c => new ConversationDto
            {
                Id = c.Id,
                User1Id = c.User1Id,
                User2Id = c.User2Id
            });
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
    }
}