using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Shared.DataTransferObjects.Wallet
{
    public class WalletForCreationDto
    {
        [Required(ErrorMessage = "Wallet name is a required field.")]
        [MaxLength(120, ErrorMessage = "Maximum length for the Name is 120 characters.")]
        public string? Name { get; init; }

        public decimal InitBalance { get; init; }

        public string? Avatar { get; init; }
    }
}
