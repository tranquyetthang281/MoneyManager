using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Contracts.RepositoryContracts
{
    public interface IWalletRepository
    {
        void CreateWallet(Wallet wallet);

        Task<Wallet?> GetWalletAsync(Guid id, bool trackChanges);

        void DeleteWallet(Wallet wallet);
    }
}
