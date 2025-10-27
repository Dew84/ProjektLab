using Microsoft.EntityFrameworkCore;
using TradeByte.Context;
using TradeByte.Models;
using TradeByte.Repositories.Interfaces;

namespace TradeByte.Repositories
{
    public class ConversationRepository : IConversationRepository
    {
        private readonly AppDbContext _context;

        public ConversationRepository(AppDbContext context)
        {
            _context = context;
        }

        public Task CreateConversation(Conversation conversation, CancellationToken ct = default)
        {
            _context.Conversations.Add(conversation);
            return Task.CompletedTask;
        }

        public async Task<Conversation?> GetConversationByIdAsync(int id, CancellationToken ct = default)
        {
            return await _context.Conversations.FindAsync(id , ct);
        }

        public async Task<Conversation?> GetConversationByParticipantsAsync(int user1Id, int user2Id, CancellationToken ct = default)
        {
            return await _context.Conversations
                .FirstOrDefaultAsync(c => c.User1Id == user1Id && c.User2Id == user2Id);
        }
    }
}