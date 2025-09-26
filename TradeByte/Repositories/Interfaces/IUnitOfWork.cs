using System.Threading;
using System.Threading.Tasks;

namespace TradeByte.Repositories.Interfaces
{
    /// <summary>Több repo művelet közös mentése (EF: DbContext.SaveChangesAsync()).</summary>
    public interface IUnitOfWork
    {
        Task<int> SaveChangesAsync(CancellationToken ct = default);
    }
}
