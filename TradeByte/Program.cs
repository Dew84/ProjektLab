using Microsoft.EntityFrameworkCore;
using TradeByte.Repositories.Interfaces;
using TradeByte.Repositories;
using TradeByte.Services.Interfaces;
using TradeByte.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

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

            // HttpContextAccessor a CurrentUser szolgáltatáshoz
            builder.Services.AddHttpContextAccessor();

            // ====== JWT Authentication ======
            var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Missing Jwt:Key");
            var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "TradeByte";
            var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "TradeByteClient";

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtIssuer,
                        ValidAudience = jwtAudience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            builder.Services.AddAuthorization();

            // ====== Swagger/OpenAPI ======
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "TradeByte API",
                    Version = "v1",
                    Description = "Közösségi adok-veszek oldal API"
                });

                // JWT Bearer token támogatás Swagger UI-ban
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            // ====== CORS (fejlesztéshez) ======
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "TradeByte API v1");
                    c.RoutePrefix = string.Empty; // Swagger UI elérhető a root URL-en
                });
            }

            app.UseHttpsRedirection();

            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}