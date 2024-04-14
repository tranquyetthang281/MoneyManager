using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Presentation.ActionFilters;
using MoneyManager.Server.Shared.DataTransferObjects.Transaction;
using MoneyManager.Server.Shared.RequestFeatures;
using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Presentation.Controllers
{
    [Route("api/users/{userId:guid}/wallets/{walletId:guid}/transactions")]
    [ApiController]
    [Authorize]
    public class TransactionController : ControllerBase
    {
        private readonly IServiceManager _service;
        public TransactionController(IServiceManager service) => _service = service;

        [HttpGet]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> GetTransactionsInMonthForWallet
            (Guid userId, Guid walletId, [FromQuery][Required] TransactionParameters transactionParameters)
        {
            var transactions = await _service.TransactionService.GetTransactionsInMonthForWalletAsync
                                    (userId, walletId, transactionParameters.Time, trackChanges: false);
            return Ok(transactions);
        }

        [HttpGet]
        [Route("/api/users/{userId:guid}/transactions")]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> GetAllTransactionsInMonth
            (Guid userId, [FromQuery][Required] TransactionParameters transactionParameters)
        {
            var transactions = await _service.TransactionService.GetAllTransactionsInMonthAsync
                                    (userId, transactionParameters.Time, trackChanges: false);
            return Ok(transactions);
        }

        [HttpGet("{transactionId:guid}", Name = "GetTransaction")]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> GetAllTransactionsInMonthForWallet(Guid userId, Guid walletId, Guid transactionId)
        {
            var transaction = await _service.TransactionService.GetTransactionAsync
                                    (userId, walletId, transactionId, trackChanges: false);
            return Ok(transaction);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        [ServiceFilter(typeof(ValidationDtoFilterAttribute))]
        public async Task<IActionResult> CreateTransaction
            (Guid userId, Guid walletId, [FromBody] TransactionForCreationDto transactionDto)
        {
            var createdTransaction = await _service.TransactionService.CreateTransactionForWalletAsync
                                         (userId, walletId, transactionDto, trackChanges: (false, true, true, false));
            return CreatedAtRoute("GetTransaction", new { userId, walletId, transactionId = createdTransaction.Id }, 
                createdTransaction);
        }

        [HttpDelete("{transactionId:guid}")]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> DeleteTransaction(Guid userId, Guid walletId, Guid transactionId)
        {
            await _service.TransactionService.DeleteTransactionAsync
                (userId, walletId, transactionId, trackChanges: (false, true, true, false, false));
            return NoContent();
        }

        [HttpPut("{transactionId:guid}")]
        [ServiceFilter(typeof(ValidationDtoFilterAttribute))]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> UpdateTransaction
            (Guid userId, Guid walletId, Guid transactionId, [FromBody] TransactionForUpdateDto transactionDto)
        {
            await _service.TransactionService.UpdateTransactionAsync
                    (userId, walletId, transactionId, transactionDto, trackChanges: (false, true, true, false, true));
            return NoContent();
        }

        [HttpPatch("{transactionId:guid}")]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> PartiallyUpdateTransaction
            (Guid userId, Guid walletId, Guid transactionId, [FromBody] JsonPatchDocument<TransactionForUpdateDto> patchDoc)
        {
            if (patchDoc is null)
                return BadRequest("patchDoc object sent from client is null.");

            var result = await _service.TransactionService.GetTransactionForPatchAsync
                (userId, walletId, transactionId, trackChanges: (false, true));

            patchDoc.ApplyTo(result.transactionToPatch, ModelState);

            TryValidateModel(result.transactionToPatch);

            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            await _service.TransactionService.SaveChangesForPatchAsync(result.transactionToPatch, result.transactionEntity);

            return NoContent();
        }
    }
}
