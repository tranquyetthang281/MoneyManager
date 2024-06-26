﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyManager.Server.Entities.Models
{
    public class Transaction
    {
        public Guid Id { get; set; }

        public DateTime Date { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }

        public string? Note { get; set; }

        [Required(ErrorMessage = "CategoryId is a required field.")]
        [ForeignKey(nameof(Category))]
        public Guid CategoryId { get; set; }

        [Required(ErrorMessage = "CreatorId is a required field.")]
        [ForeignKey(nameof(Creator))]
        public Guid CreatorId { get; set; }

        [ForeignKey(nameof(TransferredUser))]
        public Guid? TransferredUserId { get; set; }
    
        [Required(ErrorMessage = "WalletId is a required field.")]
        [ForeignKey(nameof(Wallet))]
        public Guid WalletId { get; set; }

        [ForeignKey(nameof(TransferredWallet))]
        public Guid? TransferredWalletId { get; set; }

        [ForeignKey(nameof(TransferredTransaction))]
        public Guid? TransferredTransactionId { get; set; }

        public virtual Category? Category { get; set; }

        public virtual User? Creator { get; set; }

        public virtual User? TransferredUser { get; set; }

        public virtual Wallet? Wallet { get; set; }

        public virtual Wallet? TransferredWallet { get; set; }

        public virtual Transaction? TransferredTransaction {  get; set; }
    }
}
