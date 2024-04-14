using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Repository.Configuration
{
    public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.HasData
            (
                new Transaction
                {
                    Id = Guid.NewGuid(),
                    WalletId = new Guid("a10d4c05-49b6-410c-bc78-2d54a9991870"),
                    CreatorId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"),
                    Date = DateTime.Now,
                    Note = "first trans",
                    CategoryId = new Guid("b11d4c05-49b6-410c-bc78-2d54a9991870"),
                    Amount = -200000,
                },
                new Transaction
                {
                    Id = Guid.NewGuid(),
                    WalletId = new Guid("a10d4c05-49b6-410c-bc78-2d54a9991870"),
                    CreatorId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"),
                    Date = DateTime.Now,
                    Note = "second trans",
                    CategoryId = new Guid("b10d4c05-49b6-410c-bc78-2d54a9991870"),
                    Amount = 400000,
                },
                new Transaction
                {
                    Id = new Guid("b15d4c05-49b6-410c-bc78-2d54a9991870"),
                    WalletId = new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870"),
                    CreatorId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"),
                    Date = DateTime.Now,
                    CategoryId = new Guid("d11d4c05-49b6-410c-bc78-2d54a9991870"),
                    Amount = 200000,
                },
                new Transaction
                {
                    Id = Guid.NewGuid(),
                    WalletId = new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870"),
                    CreatorId = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"),
                    TransferredUserId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"),
                    TransferredTransactionId = new Guid("b15d4c05-49b6-410c-bc78-2d54a9991870"),
                    Date = DateTime.Now,
                    CategoryId = new Guid("d10d4c05-49b6-410c-bc78-2d54a9991870"),
                    Amount = -200000,
                }
            );
        }
    }
}
