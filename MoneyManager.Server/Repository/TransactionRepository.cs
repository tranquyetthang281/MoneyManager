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

        public async Task<IEnumerable<Transaction>> GetTransactionsInMonthAsync
            (Guid userId, Guid walletId, DateTime time, bool trackChanges)
            => await FindByCondition(tr => tr.WalletId == walletId && tr.CreatorId == userId
                            && tr.Date.Month == time.Month && tr.Date.Year == time.Year, trackChanges)
                    .ToListAsync();

        public async Task<IEnumerable<Transaction>> GetAllTransactionsInMonthAsync
            (Guid userId, DateTime time, bool trackChanges)
            => await FindByCondition(tr => tr.CreatorId == userId 
                        && tr.Date.Month == time.Month && tr.Date.Year == time.Year, trackChanges)
                    .ToListAsync();

        public async Task<Transaction?> GetTransactionAsync(Guid id, bool trackChanges)
            => await FindByCondition(tr => tr.Id == id, trackChanges).SingleOrDefaultAsync();

        public void CreateTransaction(Transaction transaction) => Create(transaction);

        public void DeleteTransaction(Transaction transaction) => Delete(transaction);
    }
}
