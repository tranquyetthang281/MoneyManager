using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Contracts;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Shared.DataTransferObjects.Transaction;
using MoneyManager.Server.Entities.Exceptions;
using AutoMapper;
using MoneyManager.Server.Entities.Models;
using MoneyManager.Server.Service.Enum;

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

        public async Task<IEnumerable<TransactionDto>> GetTransactionsInMonthForWalletAsync
            (Guid userId, Guid walletId, DateTime time, bool trackChanges)
        {
            await CheckIfUserAndWalletExists(userId, walletId, trackChanges);
            var transactions = await _repository.Transaction.GetTransactionsInMonthAsync
                (userId, walletId, time, trackChanges);
            var transactionDtos = _mapper.Map<IEnumerable<TransactionDto>>(transactions);
            return transactionDtos;
        }

        public async Task<IEnumerable<TransactionDto>> GetAllTransactionsInMonthAsync
            (Guid userId, DateTime time, bool trackChanges)
        {
            _ = await GetUserAndCheckIfItExists(userId, trackChanges);
            var transactions = await _repository.Transaction.GetAllTransactionsInMonthAsync 
                (userId, time, trackChanges);
            var transactionDtos = _mapper.Map<IEnumerable<TransactionDto>>(transactions);
            return transactionDtos;
        }

        public async Task<TransactionDto> GetTransactionAsync(Guid userId, Guid walletId, Guid transactionId, bool trackChanges)
        {
            await CheckIfUserAndWalletExists(userId, walletId, trackChanges);
            var transaction = await GetTransactionAndCheckIfItExists(transactionId, trackChanges);
            var transactionDto = _mapper.Map<TransactionDto>(transaction);
            return transactionDto;
        }

        public async Task<TransactionDto> CreateTransactionForWalletAsync
            (Guid userId, Guid walletId, TransactionForCreationDto transactionDto,
            (bool user, bool wallet, bool userWallet, bool category) trackChanges)
        {
            var user = await GetUserAndCheckIfItExists(userId, trackChanges.user);
            var wallet = await GetWalletAndCheckIfItExists(walletId, trackChanges.wallet);
            var userWallet = await GetUserWalletAndCheckIfItExists(userId, walletId, trackChanges.userWallet);
            var category = await GetCategoryAndCheckIfItExists(transactionDto.CategoryId, trackChanges.category);

            var walletBalanceChange = true;
            Guid? transferredTransactionId = null;
        
            if (category.Type == (int)CategoryType.TransferToFriend)
            {
                if (!transactionDto.TransferredUserId.HasValue)
                    throw new TransferredUserIdNullBadRequestException();

                transferredTransactionId = await CreateReceiveTransactionForUser
                    (transactionDto.TransferredUserId.Value, walletId, transactionDto, user, trackChanges);
                walletBalanceChange = false;
            }
            else if (category.Type == (int)CategoryType.TransferToWallet)
            {
                if (!transactionDto.TransferredWalletId.HasValue)
                    throw new TransferredWalletIdNullBadRequestException();

                transferredTransactionId = await CreateReceiveTransactionForWallet
                    (userId, transactionDto.TransferredWalletId.Value, transactionDto, wallet, trackChanges);
            }

            var transaction = _mapper.Map<Transaction>(transactionDto);
            transaction.CreatorId = userId;
            transaction.WalletId = walletId;
            transaction.TransferredTransactionId = transferredTransactionId;
            _repository.Transaction.CreateTransaction(transaction);
            
            var balanceChange = category.Type < 0 ? -Math.Abs(transaction.Amount) : Math.Abs(transaction.Amount);
            userWallet.Balance += balanceChange;
            if (walletBalanceChange)
                wallet.Balance += balanceChange;

            await _repository.SaveAsync();

            var transactionToReturn = _mapper.Map<TransactionDto>(transaction);
            return transactionToReturn;
        }

        public async Task UpdateTransactionAsync
            (Guid userId, Guid walletId, Guid transactionId, TransactionForUpdateDto transactionDto,
            (bool user, bool wallet, bool userWallet, bool category, bool transaction) trackChanges)
        {
            _ = await GetUserAndCheckIfItExists(userId, trackChanges.user);
            var wallet = await GetWalletAndCheckIfItExists(walletId, trackChanges.wallet);
            var userWallet = await GetUserWalletAndCheckIfItExists(userId, walletId, trackChanges.userWallet);
            var transaction = await GetTransactionAndCheckIfItExists(transactionId, trackChanges.transaction);

            if (transaction.CreatorId != userId)
                throw new UserIsNotCreatorBadRequestException(userId, transactionId);
            if (transaction.WalletId != walletId)
                throw new TransactionIsNotInWalletBadRequestException(transactionId, walletId);

            if (transaction.Amount == transactionDto.Amount && transaction.CategoryId == transactionDto.CategoryId)
            {
                _mapper.Map(transactionDto, transaction);
            }
            else
            {
                await UpdateAmountForTransaction
                    (userId, walletId, transaction, transactionDto, userWallet, wallet, trackChanges);
            }

            await _repository.SaveAsync();
        }

        public async Task DeleteTransactionAsync(Guid userId, Guid walletId, Guid transactionId,
            (bool user, bool wallet, bool userWallet, bool category, bool transaction) trackChanges)
        {
            _ = await GetUserAndCheckIfItExists(userId, trackChanges.user);
            var wallet = await GetWalletAndCheckIfItExists(walletId, trackChanges.wallet);
            var userWallet = await GetUserWalletAndCheckIfItExists(userId, walletId, trackChanges.userWallet);
            var transaction = await GetTransactionAndCheckIfItExists(transactionId, trackChanges.transaction);

            if (transaction.CreatorId != userId)
                throw new UserIsNotCreatorBadRequestException(userId, transactionId);
            if (transaction.WalletId != walletId)
                throw new TransactionIsNotInWalletBadRequestException(transactionId, walletId);
            
            var category = await GetCategoryAndCheckIfItExists(transaction.CategoryId, trackChanges.category);
            
            var transferredTransactionId = transaction.TransferredTransactionId;
            _repository.Transaction.DeleteTransaction(transaction);

            var balanceChange = category.Type < 0 ? - Math.Abs(transaction.Amount) : Math.Abs(transaction.Amount);
            var walletBalanceChange = true;
        
            if (category.Type == (int)CategoryType.TransferToFriend)
            {
                if (!transaction.TransferredUserId.HasValue)
                    throw new TransferredUserIdNullBadRequestException();
               
                var transferredUserWallet = await GetUserWalletAndCheckIfItExists
                    (transaction.TransferredUserId.Value, walletId, trackChanges.userWallet);
                transferredUserWallet.Balance += balanceChange;
                walletBalanceChange = false;
            }
            else if (category.Type == (int)CategoryType.TransferToWallet)
            {
                if (!transaction.TransferredWalletId.HasValue)
                    throw new TransferredWalletIdNullBadRequestException();

                var transferredWallet = await GetWalletAndCheckIfItExists
                    (transaction.TransferredWalletId.Value, trackChanges.wallet);
                transferredWallet.Balance += balanceChange;
                var transferredUserWallet = await GetUserWalletAndCheckIfItExists
                    (userId, transaction.TransferredWalletId.Value, trackChanges.userWallet);
                transferredUserWallet.Balance += balanceChange;
            }

            if (transferredTransactionId.HasValue)
            {
                var transferredTransaction = await GetTransactionAndCheckIfItExists
                    (transferredTransactionId.Value, trackChanges.transaction);
                _repository.Transaction.DeleteTransaction(transferredTransaction);
            }

            userWallet.Balance -= balanceChange;
            if (walletBalanceChange)
                wallet.Balance -= balanceChange;

            await _repository.SaveAsync();
        }


        public async Task<(TransactionForUpdateDto transactionToPatch, Transaction transactionEntity)>
            GetTransactionForPatchAsync(Guid userId, Guid walletId, Guid transactionId, 
            (bool userAndWallet, bool transaction) trackChanges)
        {
            await CheckIfUserAndWalletExists(userId, walletId, trackChanges.userAndWallet);
            var transaction = await GetTransactionAndCheckIfItExists(transactionId, trackChanges.transaction);
            var transactionToPath = _mapper.Map<TransactionForUpdateDto>(transaction);
            return (transactionToPath, transaction);
        }

        public async Task SaveChangesForPatchAsync(TransactionForUpdateDto transactionToPatch, Transaction transactionEntity)
        {
            _mapper.Map(transactionToPatch, transactionEntity);
            await _repository.SaveAsync();
        }

        #region Private methods
        private async Task<User> GetUserAndCheckIfItExists(Guid userId, bool trackChanges)
        {
            var user = await _repository.User.GetUserAsync(userId, trackChanges);
            if (user is null)
                throw new UserNotFoundException(userId);
            return user;
        }

        private async Task<Wallet> GetWalletAndCheckIfItExists(Guid walletId, bool trackChanges)
        {
            var wallet = await _repository.Wallet.GetWalletAsync(walletId, trackChanges);
            if (wallet is null)
                throw new WalletNotFoundException(walletId);
            return wallet;
        }

        private async Task<UserWallet> GetUserWalletAndCheckIfItExists(Guid userId, Guid walletId, bool trackChanges)
        {
            var userWallet = await _repository.UserWallet.GetUserWalletAsync(userId, walletId, trackChanges);
            if (userWallet is null)
                throw new UserWalletNotFoundException(userId, walletId);
            return userWallet;
        }

        private async Task CheckIfUserAndWalletExists(Guid userId, Guid walletId, bool trackChanges)
        {
            _ = await GetUserAndCheckIfItExists(userId, trackChanges);
            _ = await GetWalletAndCheckIfItExists(walletId, trackChanges);
            _ = await GetUserWalletAndCheckIfItExists(userId, walletId, trackChanges);
        }

        private async Task<Transaction> GetTransactionAndCheckIfItExists(Guid transactionId, bool trackChanges)
        {
            var transaction = await _repository.Transaction.GetTransactionAsync(transactionId, trackChanges);
            if (transaction is null)
                throw new TransactionNotFoundException(transactionId);
            return transaction;
        }

        private async Task<Category> GetCategoryAndCheckIfItExists(Guid categoryId, bool trackChanges)
        {
            var category = await _repository.Category.GetCategoryAsync(categoryId, trackChanges);
            if (category is null)
                throw new CategoryNotFoundException(categoryId);
            return category;
        }

        private async Task<Guid> CreateReceiveTransactionForUser
            (Guid userId, Guid walletId, TransactionForCreationDto transactionDto, User sender,
            (bool user, bool wallet, bool userWallet, bool category) trackChanges)
        {
            _ = await GetUserAndCheckIfItExists(userId, trackChanges.user);
            var receiveUserWallet = await GetUserWalletAndCheckIfItExists(userId, walletId, trackChanges.userWallet);
            var receiveCategories = await _repository.Category.GetManyCategoriesByTypeAsync
                                    ((int)CategoryType.ReceiveFromFriend, trackChanges.category);
            var receiveCategory = receiveCategories.SingleOrDefault();
            if (receiveCategory is null)
                throw new CategoryNotFoundException((int)CategoryType.ReceiveFromFriend);
            var receiveTransaction = new Transaction
            {
                Date = transactionDto.Date,
                CreatorId = userId,
                WalletId = walletId,
                CategoryId = receiveCategory.Id,
                Amount = Math.Abs(transactionDto.Amount),
                Note = $"Transferred money from user {sender.Name}. Note: \"{transactionDto.Note}\"",
            };
            _repository.Transaction.CreateTransaction(receiveTransaction);
            receiveUserWallet.Balance += receiveTransaction.Amount;
            return receiveTransaction.Id;
        }

        private async Task<Guid> CreateReceiveTransactionForWallet
            (Guid userId, Guid walletId, TransactionForCreationDto transactionDto, Wallet sourceWallet,
            (bool user, bool wallet, bool userWallet, bool category) trackChanges)
        {
            var receiveWallet = await GetWalletAndCheckIfItExists(walletId, trackChanges.wallet);
            var receiveUserWallet = await GetUserWalletAndCheckIfItExists(userId, walletId, trackChanges.userWallet);
            var receiveCategories = await _repository.Category.GetManyCategoriesByTypeAsync
                                    ((int)CategoryType.ReceiveFromWallet, trackChanges.category);
            var receiveCategory = receiveCategories.SingleOrDefault();
            if (receiveCategory is null)
                throw new CategoryNotFoundException((int)CategoryType.ReceiveFromWallet);
            var receiveTransaction = new Transaction
            {
                Date = transactionDto.Date,
                CreatorId = userId,
                WalletId = walletId,
                CategoryId = receiveCategory.Id,
                Amount = Math.Abs(transactionDto.Amount),
                Note = $"Transferred money from wallet {sourceWallet.Name}. Note: \"{transactionDto.Note}\"",
            };
            _repository.Transaction.CreateTransaction(receiveTransaction);
            receiveUserWallet.Balance += receiveTransaction.Amount;
            receiveWallet.Balance += receiveTransaction.Amount;
            return receiveTransaction.Id;
        }

        private async Task UpdateAmountForTransaction(Guid userId, Guid walletId, 
            Transaction transaction, TransactionForUpdateDto transactionDto, UserWallet userWallet, Wallet wallet,
            (bool user, bool wallet, bool userWallet, bool category, bool transaction) trackChanges)
        {
            var oldCategory = await GetCategoryAndCheckIfItExists(transaction.CategoryId, trackChanges.category);
            var oldAmount = oldCategory.Type < 0 ? -Math.Abs(transaction.Amount) : Math.Abs(transaction.Amount);

            _mapper.Map(transactionDto, transaction);

            var newCategory = await GetCategoryAndCheckIfItExists(transaction.CategoryId, trackChanges.category);
            var newAmount = newCategory.Type < 0 ? -Math.Abs(transaction.Amount) : Math.Abs(transaction.Amount);
            var walletBalanceChange = true;

            if (oldCategory.Type == (int)CategoryType.TransferToFriend)
            {
                if (!transaction.TransferredUserId.HasValue)
                    throw new TransferredUserIdNullBadRequestException();

                var transferredUserWallet = await GetUserWalletAndCheckIfItExists
                    (transaction.TransferredUserId.Value, walletId, trackChanges.userWallet);
                transferredUserWallet.Balance += oldAmount;
                transferredUserWallet.Balance -= newAmount;
                walletBalanceChange = false;
            }
            else if (oldCategory.Type == (int)CategoryType.TransferToWallet)
            {
                if (!transaction.TransferredWalletId.HasValue)
                    throw new TransferredWalletIdNullBadRequestException();

                var transferredWallet = await GetWalletAndCheckIfItExists
                    (transaction.TransferredWalletId.Value, trackChanges.wallet);
                transferredWallet.Balance += oldAmount;
                transferredWallet.Balance -= newAmount;
                var transferredUserWallet = await GetUserWalletAndCheckIfItExists
                    (userId, transaction.TransferredWalletId.Value, trackChanges.userWallet);
                transferredUserWallet.Balance += oldAmount;
                transferredUserWallet.Balance -= newAmount;
            }

            userWallet.Balance -= oldAmount;
            userWallet.Balance += newAmount;
            if (walletBalanceChange)
            {
                wallet.Balance -= oldAmount;
                wallet.Balance += newAmount;
            }

        }
        #endregion
    }
}
