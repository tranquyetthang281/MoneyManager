using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Contracts.RepositoryContracts
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync(bool trackChanges);

        Task<User?> GetUserAsync(Guid id, bool trackChanges);

        void CrateUser(User user);

        public void DeleteUser(User user);
    }
}
