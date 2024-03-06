using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyManager.Server.Entities.Models
{
    public class UserWallet
    {
        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }

        [ForeignKey(nameof(Wallet))]
        public Guid WalletId { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Balance { get; set; }

        public bool IsOwner { get; set; }

        public virtual User? User { get; set; }

        public virtual Wallet? Wallet { get; set; }
    }
}
