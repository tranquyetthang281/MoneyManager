﻿using MoneyManager.Server.Entities.Models;
using MoneyManager.Server.Shared.DataTransferObjects.Wallet;

namespace MoneyManager.Server.Contracts.ServiceContracts
{
    public interface IWalletService
    {
        Task<IEnumerable<WalletDto>> GetAllWalletsForUserAsync(Guid userId, bool trackChanges);

        Task<IEnumerable<WalletDto>> GetAllWalletsWithTotalForUserAsync(Guid userId, bool trackChanges);

        Task<WalletDto> GetWalletForUserAsync(Guid userId, Guid walletId, bool trackChanges);

        Task<WalletDto> CreateWalletForUserAsync(Guid userId, WalletForCreationDto walletDto, bool trackChanges);

        Task UpdateWalletForUserAsync
            (Guid userId, Guid walletId, WalletForUpdateDto walletDto, bool userTrackChanges, bool walletTrackChanges);

        Task AddFriendToWalletAsync(Guid userId, Guid walletId, Guid friendId, bool trackChanges);

        Task<IEnumerable<WalletMemberDto>> GetAllMembersOfWalletsAsync(Guid userId, Guid walletId, bool trackChanges);
    }
}
