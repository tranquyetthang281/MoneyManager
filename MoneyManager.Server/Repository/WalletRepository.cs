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

        public async Task<IEnumerable<Tuple<Wallet, UserWallet>>> GetAllWalletsForUserAsync(Guid userId, bool trackChanges)
            => await (trackChanges ?
             (from w in RepositoryContext.Wallets
              join uw in RepositoryContext.UserWallets! on w.Id equals uw.WalletId
              where uw.UserId == userId
              select new Tuple<Wallet, UserWallet>(w, uw)).ToListAsync()
            : (from uw in RepositoryContext.UserWallets
               join w in RepositoryContext.Wallets! on uw.WalletId equals w.Id
               where uw.UserId == userId
               select new Tuple<Wallet, UserWallet>(w, uw)).AsNoTracking().ToListAsync());

        public async Task<Wallet?> GetWalletAsync(Guid id, bool trackChanges)
            => await FindByCondition(w => w.Id.Equals(id), trackChanges).SingleOrDefaultAsync();

        public void CreateWallet(Wallet wallet) => Create(wallet);

        public void DeleteWallet(Wallet wallet) => Delete(wallet);
    }
}
