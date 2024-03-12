using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Contracts.RepositoryContracts
{
    public interface IUserWalletRepository
    {
        void CreateUserWallet(UserWallet userWallet);

        Task<UserWallet?> GetUserWalletAsync(Guid userId, Guid walletId, bool trackChanges);
    }
}
