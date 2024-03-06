using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Repository.Configuration
{
    public class UserWalletConfiguration : IEntityTypeConfiguration<UserWallet>
    {
        public void Configure(EntityTypeBuilder<UserWallet> builder)
        {
            builder.HasData
            (
                new UserWallet
                {
                    UserId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"),
                    WalletId = new Guid("a10d4c05-49b6-410c-bc78-2d54a9991870"),
                    IsOwner = true,
                    Balance = 200000,
                },
                new UserWallet
                {
                    UserId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"),
                    WalletId = new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870"),
                    IsOwner = true,
                    Balance = 200000,
                },
                new UserWallet
                {
                    UserId = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"),
                    WalletId = new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870"),
                    IsOwner = false,
                    Balance = -200000,
                }
            );
        }
    }
}
