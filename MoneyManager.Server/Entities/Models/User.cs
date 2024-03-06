using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyManager.Server.Entities.Models
{
    public class User
    {
        public Guid Id { get; set; }
        
        [Required(ErrorMessage = "Email is a required field.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is a required field.")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "User name is a required field.")]
        public string? Name { get; set; }    

        public DateTime? BirthDate { get; set; }

        public string? Avatar { get; set; }

        public virtual ICollection<UserWallet>? UserWallets { get; set; }

        public virtual ICollection<Friendship>? Friendships { get; set; }

        public virtual ICollection<Friendship>? InvitedFriendships { get; set; }
    }
}
