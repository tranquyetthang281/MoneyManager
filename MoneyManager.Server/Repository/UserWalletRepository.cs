using Microsoft.EntityFrameworkCore;
using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Repository
{
    public sealed class UserWalletRepository : RepositoryBase<UserWallet>, IUserWalletRepository
    {
        public UserWalletRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<UserWallet?> GetUserWalletAsync(Guid userId, Guid walletId, bool trackChanges)
            => await FindByCondition(uw => uw.UserId == userId && uw.WalletId == walletId, trackChanges)
                    .SingleOrDefaultAsync();

        public void CreateUserWallet(UserWallet userWallet) => Create(userWallet);

        public void DeleteUserWallet(UserWallet userWallet) => Delete(userWallet);
    }
}
