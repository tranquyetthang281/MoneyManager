using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Contracts.RepositoryContracts
{
    public interface IUserWalletRepository
    {
        Task<UserWallet?> GetUserWalletAsync(Guid userId, Guid walletId, bool trackChanges);

        Task<IList<UserWallet>> GetManyUserWalletsByUserAsync(Guid userId, bool trackChanges);

        Task<IList<UserWallet>> GetManyUserWalletsByWalletAsync(Guid walletId, bool trackChanges);

        void CreateUserWallet(UserWallet userWallet);

        void DeleteUserWallet(UserWallet userWallet);
    }
}
