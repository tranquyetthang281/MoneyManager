using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Shared.DataTransferObjects.Category
{
    public record CategoryForCreationDto
    {
        [Required(ErrorMessage = "Category name is a required field.")]
        public string? Name { get; init; }

        [Required(ErrorMessage = "Category type is a required field.")]
        public int Type { get; init; }
    }
}
