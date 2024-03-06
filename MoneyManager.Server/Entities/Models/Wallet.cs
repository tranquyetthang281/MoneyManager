using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyManager.Server.Entities.Models
{
    public class Wallet
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Wallet name is a required field.")]
        public string? Name { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Balance { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal InitBalance { get; set; }

        public virtual ICollection<UserWallet>? UserWallets { get; set; }

        public virtual ICollection<Transaction>? Transactions { get; set; }

        public virtual ICollection<Transaction>? IncomingTransactions { get; set; }
    }
}
