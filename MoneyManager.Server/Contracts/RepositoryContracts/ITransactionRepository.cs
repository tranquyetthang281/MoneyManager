using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Contracts.RepositoryContracts
{
    public interface ITransactionRepository
    {
        Task<IEnumerable<Transaction>> GetAllTransactionsInMonthForWalletAsync(Guid walletId, DateTime time, bool trackChanges);

        void CreateTransaction(Transaction transaction);

        void DeleteTransaction(Transaction transaction)
    }
}
