using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Contracts;
using MoneyManager.Server.Contracts.ServiceContracts;
using AutoMapper;
using MoneyManager.Server.Shared.DataTransferObjects.Wallet;
using MoneyManager.Server.Entities.Exceptions;
using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Service
{
    internal sealed class WalletService : IWalletService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;

        public WalletService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        private async Task CheckIfUserExists(Guid userId, bool trackChanges)
        {
            var user = await _repository.User.GetUserAsync(userId, trackChanges);
            if (user is null)
                throw new UserNotFoundException(userId);
        }

        private async Task<Wallet> GetWalletAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var wallet = await _repository.Wallet.GetWalletAsync(id, trackChanges);
            if (wallet is null)
                throw new WalletNotFoundException(id);
            return wallet;
        }

        private async Task<UserWallet> GetUserWalletAndCheckIfUserIsAllowedEnterWallet(Guid userId, Guid walletId, bool trackChanges)
        {
            var userWallet = await _repository.UserWallet.GetUserWalletAsync(userId, walletId, trackChanges);
            if (userWallet is null)
                throw new WalletForbiddenException(userId, walletId);
            return userWallet;
        }

        private WalletDto MapFromWalletAndUserWalletToWalletDto(Wallet wallet, UserWallet userWallet)
             => _mapper.Map<WalletDto>(new Tuple<Wallet, UserWallet>(wallet, userWallet));

        public async Task<IEnumerable<WalletDto>> GetAllWalletsForUserAsync(Guid userId, bool trackChanges)
        {
            await CheckIfUserExists(userId, trackChanges);
            var waletsAndUserWallets = await _repository.Wallet.GetAllWalletsForUserAsync(userId, trackChanges);
            var walletDto = _mapper.Map<IEnumerable<WalletDto>>(waletsAndUserWallets);
            return walletDto;
        }

        public async Task<WalletDto> GetWalletForUserAsync(Guid userId, Guid walletId, bool trackChanges)
        {
            await CheckIfUserExists(userId, trackChanges);
            var wallet = await GetWalletAndCheckIfItExists(walletId, trackChanges);
            var userWallet = await GetUserWalletAndCheckIfUserIsAllowedEnterWallet(userId, walletId, trackChanges);
            var walletDto = MapFromWalletAndUserWalletToWalletDto(wallet, userWallet);
            return walletDto;
        }

        public async Task<WalletDto> CreateWalletForUserAsync(Guid userId, WalletForCreationDto walletDto, bool trackChanges)
        {
            await CheckIfUserExists(userId, trackChanges);
         
            var wallet = _mapper.Map<Wallet>(walletDto);
            _repository.Wallet.CreateWallet(wallet);
          
            var userWallet = new UserWallet
            {
                UserId = userId,
                WalletId = wallet.Id,
                Balance = wallet.InitBalance,
                IsOwner = true
            };
            _repository.UserWallet.CreateUserWallet(userWallet);

            await _repository.SaveAsync();

            var walletToReturn = MapFromWalletAndUserWalletToWalletDto(wallet, userWallet);
            return walletToReturn;
        }
    }
}
