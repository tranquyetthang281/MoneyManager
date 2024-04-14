using MoneyManager.Server.Entities.Models;
using MoneyManager.Server.Shared.DataTransferObjects.Transaction;

namespace MoneyManager.Server.Contracts.ServiceContracts
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionDto>> GetTransactionsInMonthForWalletAsync
            (Guid userId, Guid walletId, DateTime time, bool trackChanges);

        Task<IEnumerable<TransactionDto>> GetAllTransactionsInMonthAsync
            (Guid userId, DateTime time, bool trackChanges);

        Task<TransactionDto> GetTransactionAsync(Guid userId, Guid walletId, Guid transactionId, bool trackChanges);

        Task<(TransactionForUpdateDto transactionToPatch, Transaction transactionEntity)> 
            GetTransactionForPatchAsync(Guid userId, Guid walletId, Guid transactionId,
            (bool userAndWallet, bool transaction) trackChanges);

        Task SaveChangesForPatchAsync(TransactionForUpdateDto transactionToPatch, Transaction transactionEntity);

        Task<TransactionDto> CreateTransactionForWalletAsync
            (Guid userId, Guid walletId, TransactionForCreationDto transactionDto,
            (bool user, bool wallet, bool userWallet, bool category) trackChanges);

        Task UpdateTransactionAsync
            (Guid userId, Guid walletId, Guid transactionId, TransactionForUpdateDto transactionDto,
            (bool user, bool wallet, bool userWallet, bool category, bool transaction) trackChanges);

        Task DeleteTransactionAsync(Guid userId, Guid walletId, Guid transactionId,
            (bool user, bool wallet, bool userWallet, bool category, bool transaction) trackChanges);
    }
}
