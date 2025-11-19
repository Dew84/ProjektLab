using Microsoft.EntityFrameworkCore;
using TradeByte.Context;
using TradeByte.Models;
using TradeByte.Repositories.Interfaces;

namespace TradeByte.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        // tracked -> jó Update/Delete-hez
        public async Task<User?> GetByIdAsync(int userId, CancellationToken ct = default) =>
            await _context.Users
                          .Include(u => u.Role)
                          .Include(u => u.Classifieds)
                          .FirstOrDefaultAsync(u => u.Id == userId, ct);


        public async Task<User?> GetByEmailAsync(string email, CancellationToken ct = default) =>
            await _context.Users
                          .AsNoTracking()
                          .Include(u => u.Role) 
                          .FirstOrDefaultAsync(u => u.Email == email, ct);


        public async Task<IReadOnlyList<User>> GetAllAsync(CancellationToken ct = default) =>
            await _context.Users
                          .AsNoTracking()
                          .Include(u => u.Role)
                          .ToListAsync(ct);


        public async Task AddAsync(User user, CancellationToken ct = default) =>
            await _context.Users.AddAsync(user, ct);

        public Task UpdateAsync(User user, CancellationToken ct = default)
        {
            _context.Users.Update(user);
            return Task.CompletedTask;
        }

        public Task RemoveAsync(User user, CancellationToken ct = default)
        {
            _context.Users.Remove(user);
            return Task.CompletedTask;
        }
    }
}