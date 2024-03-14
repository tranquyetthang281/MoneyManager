using Microsoft.AspNetCore.Mvc;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Presentation.ActionFilters;
using MoneyManager.Server.Shared.DataTransferObjects.Friend;
using MoneyManager.Server.Shared.DataTransferObjects.Wallet;

namespace MoneyManager.Server.Presentation.Controllers
{
    [Route("api/users/{userId:guid}/wallets")]
    [ApiController]
    public class WalletController : ControllerBase
    {
        private readonly IServiceManager _service;
        public WalletController(IServiceManager service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAllWalletsForUser(Guid userId)
        {
            var wallets = await _service.WalletService.GetAllWalletsForUserAsync(userId, trackChanges: false);
            return Ok(wallets);
        }

        [HttpGet("{walletId:guid}", Name = "GetWalletForUser")]
        public async Task<IActionResult> GetWalletForUser(Guid userId, Guid walletId)
        {
            var wallet = await _service.WalletService.GetWalletForUserAsync(userId, walletId, trackChanges: false);
            return Ok(wallet);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationDtoFilterAttribute))]
        public async Task<IActionResult> CreateWalletForUser(Guid userId, [FromBody] WalletForCreationDto walletDto)
        {
            var wallet = await _service.WalletService.CreateWalletForUserAsync(userId, walletDto, trackChanges: false);
            return CreatedAtRoute("GetWalletForUser", new { userId, walletId = wallet.Id }, wallet);
        }

        [HttpPut("{walletId:guid}")]
        [ServiceFilter(typeof(ValidationDtoFilterAttribute))]
        public async Task<IActionResult> UpdateWalletNameForUser(Guid userId, Guid walletId, [FromBody] WalletForUpdateNameDto walletDto)
        {
            await _service.WalletService.UpdateWalletNameForUserAsync
                (userId, walletId, walletDto, userTrackChanges: false, walletTrackChanges: true);
            return NoContent();
        }

        [HttpPost("{walletId:guid}")]
        [ServiceFilter(typeof(ValidationDtoFilterAttribute))]
        public async Task<IActionResult> AddFriendToWallet(Guid userId, Guid walletId, [FromBody] FriendForAddToWalletDto friendDto)
        {
            await _service.WalletService.AddFriendToWalletAsync(userId, walletId, friendDto.FriendID, trackChanges: false);
            return NoContent();
        }
    }
}
