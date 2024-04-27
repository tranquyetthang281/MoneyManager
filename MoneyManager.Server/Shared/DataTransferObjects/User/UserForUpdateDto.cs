using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Shared.DataTransferObjects.User
{
    public record UserForUpdateDto
    {
        [Required(ErrorMessage = "Name is a required field.")]
        [MaxLength(120, ErrorMessage = "Maximum length for the Name is 120 characters.")]
        public string? Name { get; init; }

        public DateTime? BirthDate { get; init; }

        public string? Avatar { get; init; }
    }
}
