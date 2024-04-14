using MoneyManager.Server.Shared.DataTransferObjects.Category;

namespace MoneyManager.Server.Contracts.ServiceContracts
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync(bool trackChanges);

        Task<CategoryDto> GetCategoryAsync(Guid id, bool trackChanges);

        Task<CategoryDto> CreateCategoryAsync(CategoryForCreationDto creationDto);

        Task DeleteCategoryAsync(Guid id, bool trackChanges);
    }
}
