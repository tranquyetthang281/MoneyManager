using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Entities.Models
{
    public class Category
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Category name is a required field.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Category type is a required field.")]
        public int Type { get; set; }   

        public string? Avatar { get; set; }
    }
}
