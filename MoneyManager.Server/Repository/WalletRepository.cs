using Microsoft.EntityFrameworkCore;
using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Repository
{
    public sealed class WalletRepository : RepositoryBase<Wallet>, IWalletRepository
    {
        public WalletRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<Wallet?> GetWalletAsync(Guid id, bool trackChanges)
            => await FindByCondition(w => w.Id == id, trackChanges).SingleOrDefaultAsync();

        public void CreateWallet(Wallet wallet) => Create(wallet);

        public void DeleteWallet(Wallet wallet) => Delete(wallet);
    }
}
