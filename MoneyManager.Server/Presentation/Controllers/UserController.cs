using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Presentation.ActionFilters;
using MoneyManager.Server.Shared.DataTransferObjects.User;

namespace MoneyManager.Server.Presentation.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IServiceManager _service;
        public UserController(IServiceManager service) => _service = service;

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _service.UserService.GetAllUsersAsync(trackChanges: false);
            return Ok(users);
        }

        [HttpGet("{userId:guid}", Name = "UserById")]
        [Authorize]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> GetUser(Guid userId)
        {
            var user = await _service.UserService.GetUserAsync(userId, trackChanges: false);
            return Ok(user);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        [ServiceFilter(typeof(ValidationDtoFilterAttribute))]
        public async Task<IActionResult> CreateUser([FromBody] UserForCreationDto userDto)
        {
            var result = await _service.UserService.CreateUserAsync(userDto);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
                return BadRequest(ModelState);
            }
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpDelete("{id:guid}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            await _service.UserService.DeleteUserAsync(id, trackChanges: false);
            return NoContent();
        }

        [HttpPut("{userId:guid}")]
        [Authorize]
        [ServiceFilter(typeof(ValidationDtoFilterAttribute))]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> UpdateUser(Guid userId, [FromBody] UserForUpdateDto userDto)
        {
            await _service.UserService.UpdateUserAsync(userId, userDto, trackChanges: true);           
            return NoContent();
        }

        [HttpPut("{userId:guid}")]
        [Authorize]
        [ServiceFilter(typeof(ValidationUserClaimFilterAttribute))]
        public async Task<IActionResult> PartiallyUpdateUser(Guid userId, [FromBody] JsonPatchDocument<UserForUpdateDto> patchDoc)
        {
            if (patchDoc is null)
                return BadRequest("patchDoc object sent from client is null.");

            var result = await _service.UserService.GetUserForPatchAsync(userId, trackChanges: true);
            
            patchDoc.ApplyTo(result.userToPatch, ModelState);

            TryValidateModel(result.userToPatch);
           
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            await _service.UserService.SaveChangesForPatchAsync(result.userToPatch, result.userEntity);

            return NoContent();
        }
    }
}
