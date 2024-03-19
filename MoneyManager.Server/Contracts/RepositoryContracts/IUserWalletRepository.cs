using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Contracts.RepositoryContracts
{
    public interface IUserWalletRepository
    {
        Task<UserWallet?> GetUserWalletAsync(Guid userId, Guid walletId, bool trackChanges);

        Task<IEnumerable<UserWallet>> GetManyUserWalletsAsync(Guid userId, bool trackChanges);

        void CreateUserWallet(UserWallet userWallet);

        void DeleteUserWallet(UserWallet userWallet);
    }
}
