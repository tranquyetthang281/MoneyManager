using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MoneyManager.Server.Entities.Models;
using Microsoft.AspNetCore.Identity;

namespace Repository.Configuration
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<IdentityUserRole<Guid>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserRole<Guid>> builder)
        {
            builder.HasData(
                new IdentityUserRole<Guid>
                {
                    RoleId = new Guid("51C67B79-EFD4-44D1-9DC1-86932E4B1B18"),
                    UserId = new Guid("89BEDF82-3511-4565-9F44-08DC678E154F")
                });
        }
    }
}
