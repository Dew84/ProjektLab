using Microsoft.EntityFrameworkCore;
using TradeByte.Context;
using TradeByte.Models;
using TradeByte.Repositories.Interfaces;

namespace TradeByte.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly AppDbContext _context;

        public MessageRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddMessageAsync(Message message, CancellationToken ct = default)
        {
            await _context.Messages.AddAsync(message, ct);
        }

        public Task DeleteMessage(Message message, CancellationToken ct = default)
        {
            _context.Messages.Remove(message);
            return Task.CompletedTask;
        }

        public async Task<Message?> GetMessageByIdAsync(int messageId, CancellationToken ct = default)
        {
           return await _context.Messages.SingleAsync(x => x.Id == messageId);
        }

        public Task<IEnumerable<Message>> GetMessagesByConversationId(int conversationId, CancellationToken ct = default)
        {
            _context.Messages.Where(x => x.ConversationId == conversationId);
            return Task.FromResult(_context.Messages.AsEnumerable());
        }

        public Task ModifyMessage(Message message, CancellationToken ct = default)
        {
            _context.Messages.Update(message);
            return Task.CompletedTask;
        }
    }
}