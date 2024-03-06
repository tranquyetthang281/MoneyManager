using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Repository.Configuration
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasData
           (
                new Category
                {
                    Id = new Guid("b11d4c05-49b6-410c-bc78-2d54a9991870"),
                    Name = "Food and Beverage",
                    Type = -1,
                },
                new Category
                {
                    Id = new Guid("b10d4c05-49b6-410c-bc78-2d54a9991870"),
                    Name = "Salary",
                    Type = 1,
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "Incoming Transfer",
                    Type = 1,
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "Outgoing Transfer",
                    Type = -1,
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "Transfer to wallet",
                    Type = -2,
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "Receive from wallet",
                    Type = 2,
                },
                new Category
                {
                    Id = new Guid("d10d4c05-49b6-410c-bc78-2d54a9991870"),
                    Name = "Transfer to friend",
                    Type = -3,
                },
                new Category
                {
                    Id = new Guid("d11d4c05-49b6-410c-bc78-2d54a9991870"),
                    Name = "Receive from friend",
                    Type = 3,
                }
            );
        }
    }
}
