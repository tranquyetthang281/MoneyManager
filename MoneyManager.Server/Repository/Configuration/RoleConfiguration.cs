using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace MoneyManager.Server.Repository.Configuration
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole<Guid>>
    {
        public void Configure(EntityTypeBuilder<IdentityRole<Guid>> builder)
        {
            builder.HasData(
                new IdentityRole<Guid>
                {
                    Id = new Guid("345C9BA5-4135-428C-8592-F343E8456E00"),
                    Name = "ApplicationUser",
                    NormalizedName = "APPLICATIONUSER"
                },
                new IdentityRole<Guid>
                {
                    Id = new Guid("51C67B79-EFD4-44D1-9DC1-86932E4B1B18"),
                    Name = "Administrator",
                    NormalizedName = "ADMINISTRATOR"
                });
        }   
    }
}
