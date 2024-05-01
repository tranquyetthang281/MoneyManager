using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MoneyManager.Server.Entities.Models;
using Microsoft.AspNetCore.Identity;

namespace Repository.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            var admin = new User
            {
                Id = new Guid("89BEDF82-3511-4565-9F44-08DC678E154F"),
                Name = "Admin",
                Email = "tranquyetthang@gmail.com",
                UserName = "tranquyetthang@gmail.com",
                NormalizedUserName = "TRANQUYETTHANG@GMAIL.COM",
                NormalizedEmail = "TRANQUYETTHANG@GMAIL.COM",
                EmailConfirmed = true,
                Avatar = string.Empty,
                BirthDate = DateTime.Now,
            };
            PasswordHasher<User> ph = new PasswordHasher<User>();
            admin.PasswordHash = ph.HashPassword(admin, "28012001");

            builder.HasData
            (
                admin
            );
        }
    }
}
