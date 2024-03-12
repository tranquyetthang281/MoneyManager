using Microsoft.AspNetCore.Mvc;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Presentation.ActionFilters;
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
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateWalletForUser(Guid userId, [FromBody] WalletForCreationDto walletDto)
        {
            var wallet = await _service.WalletService.CreateWalletForUserAsync(userId, walletDto, trackChanges: false);
            return CreatedAtRoute("GetWalletForUser", new { userId, walletId = wallet.Id }, wallet);
        }
    }
}
