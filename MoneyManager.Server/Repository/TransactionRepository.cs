using Microsoft.EntityFrameworkCore;
using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Repository
{
    public sealed class TransactionRepository : RepositoryBase<Transaction>, ITransactionRepository
    {
        public TransactionRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<Transaction>> GetAllTransactionsInMonthForWalletAsync
            (Guid walletId, DateTime time, bool trackChanges)
            => await FindByCondition(tr => tr.WalletId == walletId 
                            && tr.Date.Month == time.Month && tr.Date.Year == time.Year, trackChanges)
                    .ToListAsync();

        public void CreateTransaction(Transaction transaction) => Create(transaction);

        public void DeleteTransaction(Transaction transaction) => Delete(transaction);
    }
}
