using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Shared.DataTransferObjects.User;

namespace MoneyManager.Server.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IServiceManager _service;
        public UserController(IServiceManager service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _service.UserService.GetAllUsersAsync(trackChanges: false);
            return Ok(users);
        }

        [HttpGet("{id:guid}", Name = "UserById")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var user = await _service.UserService.GetUserAsync(id, trackChanges: false);
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserForCreationDto user)
        {
            if (user is null)
                return BadRequest("UserForCreationDto is null");
            var createdUser = await _service.UserService.CreateUserAsync(user);
            return CreatedAtRoute("UserById", new { id = createdUser.Id }, createdUser);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            await _service.UserService.DeleteUserAsync(id, trackChanges: false);
            return NoContent();
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UserForUpdateDto user)
        {
            if (user is null)
                return BadRequest("UserForUpdateDto object is null");
            await _service.UserService.UpdateUserAsync(id, user, trackChanges: true);
            return NoContent();
        }

        [HttpPatch("{id:guid}")]
        public async Task<IActionResult> PartiallyUpdateUser(Guid id, [FromBody] JsonPatchDocument<UserForUpdateDto> patchDoc)
        {
            if (patchDoc is null)
                return BadRequest("patchDoc object sent from client is null.");

            var result = await _service.UserService.GetUserForPatchAsync(id, trackChanges: true);
            
            patchDoc.ApplyTo(result.userToPatch, ModelState);

            TryValidateModel(result.userToPatch);
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            await _service.UserService.SaveChangesForPatchAsync(result.userToPatch, result.userEntity);

            return NoContent();
        }
    }
}
