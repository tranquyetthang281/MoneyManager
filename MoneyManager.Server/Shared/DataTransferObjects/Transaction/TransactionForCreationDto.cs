using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Shared.DataTransferObjects.Transaction
{
    public record TransactionForCreationDto
    {
        public DateTime Date { get; init; }

        public decimal Amount { get; init; }

        [MaxLength(120, ErrorMessage = "Maximum length for the Note is 120 characters.")]
        public string? Note { get; init; }

        [Required(ErrorMessage = "CategoryId is a required field.")]
        public Guid CategoryId { get; init; }

        public Guid? TransferredUserId { get; init; } = null;

        public Guid? TransferredWalletId { get; init; } = null;

    }
}
