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

        public async Task<IEnumerable<WalletDto>> GetAllWalletsForUserAsync(Guid userId, bool trackChanges)
        {
            await CheckIfUserExists(userId, trackChanges);
            var userWallets = await _repository.UserWallet.GetManyUserWalletsByUserAsync(userId, trackChanges);
            var walletDtos = _mapper.Map<IList<WalletDto>>(userWallets);
            return walletDtos;
        }

        public async Task<IEnumerable<WalletDto>> GetAllWalletsWithTotalForUserAsync(Guid userId, bool trackChanges)
        {
            await CheckIfUserExists(userId, trackChanges);
            var userWallets = await _repository.UserWallet.GetManyUserWalletsByUserAsync(userId, trackChanges);
            var walletDtos = _mapper.Map<IList<WalletDto>>(userWallets);
            var sumUserBalances = walletDtos.Sum(x => x.UserBalance);
            var totalDto = new WalletDto
            {
                Id = Guid.Empty,
                InitBalance = 0,
                IsOwner = true,
                Name = "Total",
                Balance = sumUserBalances,
                UserBalance = sumUserBalances,
                Avatar = "/total.png"
            };
            walletDtos.Insert(0, totalDto);
            return walletDtos;
        }

        public async Task<WalletDto> GetWalletForUserAsync(Guid userId, Guid walletId, bool trackChanges)
        {
            var userWallet = await GetUserWalletAndCheckIfItExists(userId, walletId, trackChanges);
            var walletDto = _mapper.Map<WalletDto>(userWallet);
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
                Balance = wallet.Balance,
                IsOwner = true
            };
            _repository.UserWallet.CreateUserWallet(userWallet);

            await _repository.SaveAsync();

            userWallet.Wallet = wallet;
            var walletToReturn = _mapper.Map<WalletDto>(userWallet);
            
            return walletToReturn;
        }

        public async Task UpdateWalletForUserAsync
            (Guid userId, Guid walletId, WalletForUpdateDto walletDto, bool userTrackChanges, bool walletTrackChanges)
        {
            await CheckIfUserExists(userId, userTrackChanges);
            var wallet = await GetWalletAndCheckIfItExists(walletId, walletTrackChanges);
            _ = await GetUserWalletAndCheckIfItExists(userId, walletId, userTrackChanges);
            wallet.Name = walletDto.Name;
            wallet.Avatar = walletDto.Avatar;
            await _repository.SaveAsync();
        }

        public async Task AddFriendToWalletAsync(Guid userId, Guid walletId, Guid friendId, bool trackChanges)
        {
            await CheckIfUserExists(userId, trackChanges);
            var wallet = await GetWalletAndCheckIfItExists(walletId, trackChanges);
            _ = await GetUserWalletAndCheckIfItExists(userId, walletId, trackChanges);
            await CheckIfUserExists(friendId, trackChanges);
            await CheckIfTwoUsersAreFriends(userId, friendId, trackChanges);
            var userWallet = await _repository.UserWallet.GetUserWalletAsync(friendId, walletId, trackChanges);
            if (userWallet is null)
            {
                var newUserWallet = new UserWallet
                {
                    UserId = friendId,
                    WalletId = wallet.Id,
                    Balance = 0,
                    IsOwner = false
                };
                _repository.UserWallet.CreateUserWallet(newUserWallet);
                await _repository.SaveAsync();
            }
        }

        public async Task<IEnumerable<WalletMemberDto>> GetAllMembersOfWalletsAsync(Guid userId, Guid walletId, bool trackChanges)
        {
            await CheckIfUserExists(userId, trackChanges);
            _ = await GetWalletAndCheckIfItExists(walletId, trackChanges);
            _ = await GetUserWalletAndCheckIfItExists(userId, walletId, trackChanges);
            var userWallets = await _repository.UserWallet.GetManyUserWalletsByWalletAsync(walletId, trackChanges);
            var walletMemberDtos = _mapper.Map<IList<WalletMemberDto>>(userWallets);
            return walletMemberDtos;
        }

        //Todo
        //public async Task DeleteWalletForUserAsync(Guid userId, Guid walletId, bool trackChanges)
        //{
        //    await CheckIfUserExists(userId, trackChanges);
        //    var wallet = await GetWalletAndCheckIfItExists(walletId, trackChanges);
        //    await CheckIfUserIsAllowedUpdateWallet(userId, walletId, trackChanges);
        //    _repository.Wallet.DeleteWallet(wallet);
        //}

        #region Private methods
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

        private async Task<UserWallet> GetUserWalletAndCheckIfItExists(Guid userId, Guid walletId, bool trackChanges)
        {
            var userWallet = await _repository.UserWallet.GetUserWalletAsync(userId, walletId, trackChanges);
            if (userWallet is null)
                throw new UserWalletNotFoundException(userId, walletId);
            return userWallet;
        }

        private async Task CheckIfTwoUsersAreFriends(Guid userId, Guid friendId, bool trackChanges)
        {
            var friendship = await _repository.Friendship.GetFriendshipOfTwoUsersAsync(userId, friendId, trackChanges);
            if (friendship is null || !friendship.IsAccepted)
                throw new UsersAreNotFriendsException(userId, friendId);
        }
        #endregion
    }
}
