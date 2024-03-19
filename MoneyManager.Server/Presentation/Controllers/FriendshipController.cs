using Microsoft.AspNetCore.Mvc;
using MoneyManager.Server.Contracts.ServiceContracts;

namespace MoneyManager.Server.Presentation.Controllers
{
    [Route("api/users/{userId:guid}/friends")]
    [ApiController]
    public class FriendshipController : ControllerBase
    {
        private readonly IServiceManager _service;
        public FriendshipController(IServiceManager service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAllFriendsOfUser(Guid userId)
        {
            var friends = await _service.FriendshipService.GetAllFriendsOfUserAsync(userId, trackChanges: false);
            return Ok(friends);
        }

        [HttpGet("requested")]
        public async Task<IActionResult> GetAllFriendRequestsFromUser(Guid userId)
        {
            var friends = await _service.FriendshipService.GetAllFriendRequestsFromUserAsync(userId, trackChanges: false);
            return Ok(friends);
        }

        [HttpGet("waiting")]
        public async Task<IActionResult> GetAllFriendRequestsForUser(Guid userId)
        {
            var friends = await _service.FriendshipService.GetAllFriendRequestsForUserAsync(userId, trackChanges: false);
            return Ok(friends);
        }

        [HttpGet("requested/{friendId:guid}")]
        public async Task<IActionResult> SendFriendRequest(Guid userId, Guid friendId)
        {
            await _service.FriendshipService.SendFriendRequestAsync(userId, friendId, trackChanges: false);
            return NoContent();
        }

        [HttpPut("waiting/{friendId:guid}")]
        public async Task<IActionResult> AcceptFriendRequest(Guid userId, Guid friendId)
        {
            await _service.FriendshipService.AcceptFriendRequestAsync
                (userId, friendId, userTrackChanges: false, friendshipTrackChanges: true);
            return NoContent();
        }
    }
}
