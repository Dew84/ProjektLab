
using Microsoft.EntityFrameworkCore;
using TradeByte.Repositories.Interfaces;
using TradeByte.Repositories;
using TradeByte.Services.Interfaces;
using TradeByte.Services;


namespace TradeByte
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // ====== Controllers, DB, Services ======

            builder.Services.AddControllers();

            builder.Services.AddDbContext<Context.AppDbContext>(options =>
                options.UseSqlite("Filename=tradebybytedb.db"));

            // Services
            builder.Services.AddScoped<IAdService, AdService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<ICategoryService, CategoryService>();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<ICurrentUser, CurrentUser>();
            /*builder.Services.AddScoped<IMessageService, MessageService>();
            builder.Services.AddScoped<IRatingService, RatingService>();*/

            // Repositories
            builder.Services.AddScoped<IAdRepository, AdRepository>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();


            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
