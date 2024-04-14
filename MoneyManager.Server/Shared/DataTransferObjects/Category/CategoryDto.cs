using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Shared.DataTransferObjects.Category
{
    public record CategoryDto
        (
        Guid Id,
        string Name,
        int Type
        );
}
