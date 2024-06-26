﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Presentation.ActionFilters;
using MoneyManager.Server.Shared.DataTransferObjects.Friend;
using MoneyManager.Server.Shared.DataTransferObjects.Wallet;

namespace MoneyManager.Server.Presentation.Controllers
{
    [Route("api/users/{userId:guid}/wallets")]
    [ApiController]
    [Authorize]
    public class WalletController : ControllerBase
    {
        private readonly IServiceManager _service;
        public WalletController(IServiceManager service) => _service = service;

        [HttpGet]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> GetAllWalletsForUser(Guid userId)
        {
            var wallets = await _service.WalletService.GetAllWalletsWithTotalForUserAsync(userId, trackChanges: false);
            return Ok(wallets);
        }

        [HttpGet("{walletId:guid}", Name = "GetWalletForUser")]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> GetWalletForUser(Guid userId, Guid walletId)
        {
            var wallet = await _service.WalletService.GetWalletForUserAsync(userId, walletId, trackChanges: false);
            return Ok(wallet);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationDtoFilterAttribute))]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))] 
        public async Task<IActionResult> CreateWalletForUser(Guid userId, [FromBody] WalletForCreationDto walletDto)
        {
            var wallet = await _service.WalletService.CreateWalletForUserAsync(userId, walletDto, trackChanges: false);
            return CreatedAtRoute("GetWalletForUser", new { userId, walletId = wallet.Id }, wallet);
        }

        [HttpPut("{walletId:guid}")]
        [ServiceFilter(typeof(ValidationDtoFilterAttribute))]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> UpdateWalletForUser(Guid userId, Guid walletId, [FromBody] WalletForUpdateDto walletDto)
        {
            await _service.WalletService.UpdateWalletForUserAsync
                (userId, walletId, walletDto, userTrackChanges: false, walletTrackChanges: true);
            return NoContent();
        }

        [HttpPost("{walletId:guid}")]
        [ServiceFilter(typeof(ValidationDtoFilterAttribute))]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> AddFriendToWallet(Guid userId, Guid walletId, [FromBody] FriendForAddToWalletDto friendDto)
        {
            await _service.WalletService.AddFriendToWalletAsync(userId, walletId, friendDto.FriendId, trackChanges: false);
            return NoContent();
        }

        [HttpGet("{walletId:guid}/members")]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> GetAllMembersOfWallet(Guid userId, Guid walletId)
        {
            var members = await _service.WalletService.GetAllMembersOfWalletsAsync(userId, walletId, trackChanges: false);
            return Ok(members);
        }
    }
}
