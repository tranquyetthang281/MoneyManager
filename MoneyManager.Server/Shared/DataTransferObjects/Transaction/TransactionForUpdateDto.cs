using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Shared.DataTransferObjects.Transaction
{
    public record TransactionForUpdateDto
    {
        public DateTime Date { get; init; }

        public decimal Amount { get; init; }

        [MaxLength(120, ErrorMessage = "Maximum length for the Note is 120 characters.")]
        public string? Note { get; init; }

        [Required(ErrorMessage = "CategoryId is a required field.")]
        public Guid CategoryId { get; init; }
    }
}
