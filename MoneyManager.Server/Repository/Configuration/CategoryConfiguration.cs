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
                    Id = new Guid("0cbd4c1a-e11b-4d44-96d2-b47b7ceca7f4"),
                    Name = "Food & Beverage",
                    Type = -1,
                    Avatar = "/food-and-beverage.png"
                },
                new Category
                {
                    Id = new Guid("2a821a31-af92-432f-be3a-d51becfb8d60"),
                    Name = "Transportation",
                    Type = -1,
                    Avatar = "/transportation.png"
                },
                new Category
                {
                    Id = new Guid("468882be-3467-4537-bca7-0b59368a1e1f"),
                    Name = "Rentals",
                    Type = -1,
                    Avatar = "/rentals.png"
                },
                new Category
                {
                    Id = new Guid("47b7bea2-b474-4d6a-82d1-08b52190eaab"),
                    Name = "Bill",
                    Type = -1,
                    Avatar = "/bill.png"
                },
                new Category
                {
                    Id = new Guid("49c7d810-e5f4-4b27-b89c-51b06d3cff12"),
                    Name = "Education",
                    Type = -1,
                    Avatar = "/education.png"
                },
                new Category
                {
                    Id = new Guid("5ce2742d-14ac-4227-8548-9f6ed8f0a989"),
                    Name = "Shopping",
                    Type = -1,
                    Avatar = "/shopping.png"
                },
                new Category
                {
                    Id = new Guid("79fb5982-a325-4ed7-9087-f82240438b59"),
                    Name = "Sport",
                    Type = -1,
                    Avatar = "/sport.png"
                },
                new Category
                {
                    Id = new Guid("841cb344-b768-45e9-85d7-ca588a956d11"),
                    Name = "Clothes",
                    Type = -1,
                    Avatar = "/clothes.png"
                },
                new Category
                {
                    Id = new Guid("8608f8c2-6587-49d3-9fc0-e7fca31d4eef"),
                    Name = "Coffee",
                    Type = -1,
                    Avatar = "/coffee.png"
                },
                new Category
                {
                    Id = new Guid("8979b4b9-551a-47f5-b6be-eae4236c089c"),
                    Name = "Pay Interest",
                    Type = -1,
                    Avatar = "/pay-interest.png"
                },
                new Category
                {
                    Id = new Guid("95cee5df-b529-4a4e-8a87-db06a5244458"),
                    Name = "Give Gifts",
                    Type = -1,
                    Avatar = "/give-gifts.png"
                },
                new Category
                {
                    Id = new Guid("a1d5fbaa-58d4-436a-8f89-0df1c2e1912b"),
                    Name = "Outgoing Transfer",
                    Type = -1,
                    Avatar = "/outgoing-transfer.png"
                },
                new Category
                {
                    Id = new Guid("a9dd513c-b656-44ab-9f37-accf194ccd9e"),
                    Name = "Salary",
                    Type = 1,
                    Avatar = "/salary.png"
                },
                new Category
                {
                    Id = new Guid("af853a77-43a1-4264-af16-bddcaedce257"),
                    Name = "Receive Gifts",
                    Type = 1,
                    Avatar = "/receive-gifts.png"
                },
                new Category
                {
                    Id = new Guid("d0841186-ed4b-4121-a135-a33df149b576"),
                    Name = "Incoming Transfer",
                    Type = 1,
                    Avatar = "/incoming-transfer.png"
                }
                //new Category
                //{
                //    Id = Guid.NewGuid(),
                //    Name = "Transfer to wallet",
                //    Type = -2,
                //},
                //new Category
                //{
                //    Id = Guid.NewGuid(),
                //    Name = "Receive from wallet",
                //    Type = 2,
                //},
                //new Category
                //{
                //    Id = new Guid("d10d4c05-49b6-410c-bc78-2d54a9991870"),
                //    Name = "Transfer to friend",
                //    Type = -3,
                //},
                //new Category
                //{
                //    Id = new Guid("d11d4c05-49b6-410c-bc78-2d54a9991870"),
                //    Name = "Receive from friend",
                //    Type = 3,
                //}
            );
        }
    }
}
