using MoneyManager.Server.Entities.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Shared.DataTransferObjects.Transaction
{
    public record TransactionDto
    {
        public Guid Id { get; init; }

        public DateTime Date { get; init; }

        public decimal Amount { get; init; }

        public string? Note { get; init; }

        public Guid CategoryId { get; init; }

        public Guid CreatorId { get; init; }

        public Guid? TransferredUserId { get; init; }

        public Guid WalletId { get; init; }

        public Guid? TransferredWalletId { get; init; }
    }
}
