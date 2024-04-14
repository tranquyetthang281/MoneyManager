using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Shared.DataTransferObjects.User
{
    public record UserForAuthenticationDto
    {
        [Required(ErrorMessage = "Email is required.")]
        [MaxLength(320, ErrorMessage = "Maximum length for the Email is 320 characters.")]
        [EmailAddress]
        public string? Email { get; init; }

        [Required(ErrorMessage = "Password is a required.")]
        [StringLength(maximumLength: 40, MinimumLength = 8,
            ErrorMessage = "The length of the Password must be between 8 and 40 characters.")]
        public string? Password { get; init; }
    }

}
