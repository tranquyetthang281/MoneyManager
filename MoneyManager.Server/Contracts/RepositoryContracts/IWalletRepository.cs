using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Contracts.RepositoryContracts
{
    public interface IWalletRepository
    {
        Task<IEnumerable<Tuple<Wallet, UserWallet>>> GetAllWalletsForUserAsync(Guid userId, bool trackChanges);

        void CreateWallet(Wallet wallet);

        Task<Wallet?> GetWalletAsync(Guid id, bool trackChanges);

        void DeleteWallet(Wallet wallet);
    }
}
