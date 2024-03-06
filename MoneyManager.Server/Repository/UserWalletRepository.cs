using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Repository
{
    public class UserWalletRepository : RepositoryBase<UserWallet>, IUserWalletRepository
    {
        public UserWalletRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
    }
}
