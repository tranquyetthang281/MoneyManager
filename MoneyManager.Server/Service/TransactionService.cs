using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Contracts;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Shared.DataTransferObjects.Transaction;
using MoneyManager.Server.Entities.Exceptions;
using AutoMapper;

namespace MoneyManager.Server.Service
{
    internal sealed class TransactionService : ITransactionService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;

        public TransactionService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TransactionDto>> GetAllTransactionsInMonthForWalletAsync
            (Guid userId, Guid walletId, DateTime time, bool trackChanges)
        {
            await CheckIfUserAndWalletExists(userId, walletId, trackChanges);
            var transactions = _repository.Transaction.GetAllTransactionsInMonthForWalletAsync(walletId, time, trackChanges);
            var transactionDtos = _mapper.Map<IEnumerable<TransactionDto>>(transactions);
            return transactionDtos;
        }

        public async Task AddNewNormalTransactionToWalletAsync(Guid userId, Guid walletId, DateTime time, Guid creatorId, bool trackChanges)
        {
            await CheckIfUserAndWalletExists(userId, walletId, trackChanges);
        }

        #region Private methods
        private async Task CheckIfUserAndWalletExists(Guid userId, Guid walletId, bool trackChanges)
        {
            var user = await _repository.Wallet.GetWalletAsync(userId, trackChanges);
            if (user is null)
                throw new UserNotFoundException(userId);

            var wallet = await _repository.Wallet.GetWalletAsync(walletId, trackChanges);
            if (wallet is null)
                throw new WalletNotFoundException(walletId);

            var userWallet = await _repository.UserWallet.GetUserWalletAsync(userId, walletId, trackChanges);
            if (userWallet is null)
                throw new UserWalletNotFoundException(userId, walletId);
        }
        #endregion
    }
}
