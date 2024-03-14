using Microsoft.EntityFrameworkCore;
using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Repository
{
    public sealed class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync(bool trackChanges)
            => await FindAll(trackChanges).ToListAsync();

        public async Task<User?> GetUserAsync(Guid id, bool trackChanges) 
            => await FindByCondition(u => u.Id == id, trackChanges).SingleOrDefaultAsync();

        public async Task<IEnumerable<User>> GetUsersAsync(IEnumerable<Guid> ids, bool trackChanges) 
            => await FindByCondition(u => ids.Contains(u.Id), trackChanges).ToListAsync();

        public void CrateUser(User user) => Create(user);

        public void DeleteUser(User user) => Delete(user);
    }
}
