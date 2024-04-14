using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MoneyManager.Server.Entities.Models;

namespace Repository.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasData
            (
                new User
                {
                    Name = "User1",
                    Email = "user1@gmail.com",
                    Avatar = string.Empty,
                    BirthDate = DateTime.Now,
                },
                new User
                {
                    Name = "User2",
                    Email = "user2@gmail.com",
                    Avatar = string.Empty,
                    BirthDate = DateTime.Now,
                },
                new User
                {
                    Name = "User3",
                    Email = "user3@gmail.com",
                    Avatar = string.Empty,
                    BirthDate = DateTime.Now,
                }
            );
        }
    }
}
