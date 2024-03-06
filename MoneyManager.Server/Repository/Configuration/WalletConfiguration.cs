using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Repository.Configuration
{
    public class WalletConfiguration : IEntityTypeConfiguration<Wallet>
    {
        public void Configure(EntityTypeBuilder<Wallet> builder)
        {
            builder.HasData
            (
                new Wallet
                {
                    Id = new Guid("a10d4c05-49b6-410c-bc78-2d54a9991870"),
                    Balance = 200000,
                    Name = "Wallet1",
                    InitBalance = 0,
                },
                new Wallet
                {
                    Id = new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870"),
                    Balance = 0,
                    Name = "WalletWithUser2",
                    InitBalance = 0,
                }
            );
        }
    }
}
