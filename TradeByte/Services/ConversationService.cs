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
        public async Task<ConversationDto> CreateConversationAsync(CreateConversationDto conversationDto, CancellationToken ct = default)
        {
            User user1 = await _userRepository.GetByIdAsync(conversationDto.User1Id, ct)
                            ?? throw new Exception($"Nem található felhasználó a megadott azonosítóval: {conversationDto.User1Id}");

            User user2 = await _userRepository.GetByIdAsync(conversationDto.User1Id, ct)
                            ?? throw new Exception($"Nem található felhasználó a megadott azonosítóval: {conversationDto.User2Id}");

            Conversation conversation = new Conversation
            {
                User1Id = user1.Id,
                User2Id = user2.Id
            };
            await _conversationRepository.CreateConversation(conversation, ct);
            await _unitOfWork.SaveChangesAsync(ct);

            return new ConversationDto
            {
                Id = conversation.Id,
                User1Id = conversation.User1Id,
                User2Id = conversation.User2Id
            };
        }

        public async Task<ConversationDto?> GetConversationByParticipantsAsync(int user1Id, int user2Id, CancellationToken ct = default)
        {
            Conversation conversation = await _conversationRepository.GetConversationByParticipantsAsync(user1Id, user2Id, ct)
                ?? throw new Exception($"Nem található beszélgetés a megadott felhasználók között: {user1Id} és {user2Id}");

            return new ConversationDto
            {
                Id = conversation.Id,
                User1Id = conversation.User1Id,
                User2Id = conversation.User2Id
            };
        }
    }
}