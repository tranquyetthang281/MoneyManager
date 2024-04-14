using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Contracts.RepositoryContracts
{
    public interface ITransactionRepository
    {
        Task<IEnumerable<Transaction>> GetTransactionsInMonthAsync
            (Guid userId, Guid walletId, DateTime time, bool trackChanges);

        Task<IEnumerable<Transaction>> GetAllTransactionsInMonthAsync
            (Guid userId, DateTime time, bool trackChanges);

        Task<Transaction?> GetTransactionAsync(Guid id, bool trackChanges);

        void CreateTransaction(Transaction transaction);

        void DeleteTransaction(Transaction transaction);
    }
}
