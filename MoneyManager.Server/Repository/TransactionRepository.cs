using MoneyManager.Server.Contracts.RepositoryContracts;
using System.Transactions;

namespace MoneyManager.Server.Repository
{
    public sealed class TransactionRepository : RepositoryBase<Transaction>, ITransactionRepository
    {
        public TransactionRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
    }
}
