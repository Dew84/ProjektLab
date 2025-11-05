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
        public DbSet<Message> Messages { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Rating> Ratings { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // EF Core automatikusan létrehoz egy CategoryClassified junction table-t
            modelBuilder.Entity<Classified>()
                .HasMany(c => c.Categories)
                .WithMany(c => c.Classifieds);

            // Ratings: két irányú kapcsolat a User-hoz
            modelBuilder.Entity<Rating>()
                .HasOne(r => r.RatedUser)
                .WithMany(u => u.ReceivedRatings)
                .HasForeignKey(r => r.RatedUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Rating>()
                .HasOne(r => r.RaterUser)
                .WithMany(u => u.GivenRatings)
                .HasForeignKey(r => r.RaterUserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Egy user egy másikat csak egyszer értékelhet:
            modelBuilder.Entity<Rating>()
                .HasIndex(r => new { r.RaterUserId, r.RatedUserId })
                .IsUnique();
        }
    }
}