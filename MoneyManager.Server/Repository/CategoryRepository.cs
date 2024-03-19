using Microsoft.EntityFrameworkCore;
using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Repository
{
    public sealed class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        public CategoryRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync(bool trackChanges)
            => await FindAll(trackChanges).ToListAsync();

        public async Task<IEnumerable<Category>> GetManyCategoriesByTypeAsync(int type, bool trackChanges)
            => await FindByCondition(c => c.Type == type, trackChanges).ToListAsync();

        public async Task<Category?> GetCategoryAsync(Guid id, bool trackChanges)
            => await FindByCondition(c => c.Id == id, trackChanges).SingleOrDefaultAsync();

        public void CreateCategory(Category category) => Create(category);

        public void DeleteCategory(Category category) => Delete(category);
    }
}
