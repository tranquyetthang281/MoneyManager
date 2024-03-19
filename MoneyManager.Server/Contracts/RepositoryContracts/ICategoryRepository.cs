using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Contracts.RepositoryContracts
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync(bool trackChanges);

        Task<IEnumerable<Category>> GetManyCategoriesByTypeAsync(int type, bool trackChanges);

        Task<Category?> GetCategoryAsync(Guid id, bool trackChanges);

        void CreateCategory(Category category);

        void DeleteCategory(Category category);
    }
}
