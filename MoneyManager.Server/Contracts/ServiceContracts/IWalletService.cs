using MoneyManager.Server.Entities.Models;
using MoneyManager.Server.Shared.DataTransferObjects.Wallet;

namespace MoneyManager.Server.Contracts.ServiceContracts
{
    public interface IWalletService
    {
        Task<IEnumerable<WalletDto>> GetAllWalletsForUserAsync(Guid userId, bool trackChanges);

        Task<WalletDto> GetWalletForUserAsync(Guid userId, Guid walletId, bool trackChanges);

        Task<WalletDto> CreateWalletForUserAsync(Guid userId, WalletForCreationDto walletDto, bool trackChanges);
    }
}
