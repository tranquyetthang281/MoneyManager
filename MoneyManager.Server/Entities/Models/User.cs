using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyManager.Server.Entities.Models
{
    [Table("ApplicationUser")]
    public class User : IdentityUser<Guid>
    {
        [Required(ErrorMessage = "User name is a required field.")]
        public string? Name { get; set; }    

        public DateTime? BirthDate { get; set; }

        public string? Avatar { get; set; }

        public virtual ICollection<UserWallet>? UserWallets { get; set; }

        public virtual ICollection<Friendship>? Friendships { get; set; }

        public virtual ICollection<Friendship>? InvitedFriendships { get; set; }
    }
}
