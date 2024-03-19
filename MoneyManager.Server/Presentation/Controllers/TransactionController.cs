using Microsoft.AspNetCore.Mvc;
using MoneyManager.Server.Contracts.ServiceContracts;

namespace MoneyManager.Server.Presentation.Controllers
{
    [Route("api/users/{userId:guid}/wallets/{walletId:guid}/transactions")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly IServiceManager _service;
        public TransactionController(IServiceManager service) => _service = service;
    }
}
