using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Shared.DataTransferObjects.User
{
    public record UserForRegistrationDto
    {
        [Required(ErrorMessage = "Email is a required field.")]
        [MaxLength(320, ErrorMessage = "Maximum length for the Email is 320 characters.")]
        [EmailAddress]
        public string? Email { get; init; }

        [Required(ErrorMessage = "Password is a required field.")]
        [StringLength(maximumLength:40, MinimumLength = 8, 
            ErrorMessage = "The length of the Password must be between 8 and 40 characters.")]
        public string? Password { get; init; }

        [Required(ErrorMessage = "Name is a required field.")]
        [MaxLength(120, ErrorMessage = "Maximum length for the Name is 120 characters.")]
        public string? Name { get; init; }

        public DateTime? BirthDate { get; init; }

        public string? Avatar { get; init; }
    }
}
