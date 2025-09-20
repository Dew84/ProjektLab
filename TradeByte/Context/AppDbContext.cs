using Microsoft.EntityFrameworkCore;
using TradeByte.Models;

namespace TradeByte.Context
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
       public DbSet<User> Users { get; set; }
       public DbSet<Role> Roles { get; set; }
       public DbSet<Classified> Classifieds { get; set; }
       public DbSet<Picture> Pictures { get; set; }
       public DbSet<Category> Categories { get; set; }

    }
}
