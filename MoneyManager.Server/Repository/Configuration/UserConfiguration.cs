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
                    Id = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"),
                    Name = "User1",
                    Email = "user1@gmail.com",
                    Avatar = string.Empty,
                    BirthDate = DateTime.Now,
                    Password = "Password",
                },
                new User
                {
                    Id = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"),
                    Name = "User2",
                    Email = "user2@gmail.com",
                    Avatar = string.Empty,
                    BirthDate = DateTime.Now,
                    Password = "Password",
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    Name = "User3",
                    Email = "user3@gmail.com",
                    Avatar = string.Empty,
                    BirthDate = DateTime.Now,
                    Password = "Password",
                }
            );
        }
    }
}
