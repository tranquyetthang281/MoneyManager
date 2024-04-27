using Microsoft.AspNetCore.Mvc;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Presentation.ActionFilters;
using MoneyManager.Server.Shared.DataTransferObjects.User;
using MoneyManager.Server.Entities.Email;
using MoneyManager.Server.Entities.Models;
using MoneyManager.Server.Shared.DataTransferObjects.Wallet;

namespace MoneyManager.Server.Presentation.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly IEmailSender _emailSender;
        public AuthenticationController(IServiceManager service, IEmailSender emailSender)
        {
            _service = service;
            _emailSender = emailSender;
        }

        [HttpGet("confirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var result = await _service.AuthenticationService.ConfirmEmailAsync(token, email);
            return result ? new ContentResult
            {
                ContentType = "text/html",
                Content = "<h3>Email confirmation successfully.</h3>"
            } 
            : BadRequest("Confirm email failed");
        }

        [HttpPost("register")]
        [ServiceFilter(typeof(ValidationDtoFilterAttribute))]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userDto)
        {
            var (result, token) = await _service.AuthenticationService.RegisterUserAsync(userDto);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
                return BadRequest(ModelState);
            }

            var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = userDto.Email }, Request.Scheme);
            var message = new EmailMessage(
                new string[] { userDto.Email! },
                "MoneyManager confirmation email",
                "MoneyManager",
                "to confirm your email",
                confirmationLink!);
            await _emailSender.SendEmailAsync(message);

            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPost("login")]
        [ServiceFilter(typeof(ValidationDtoFilterAttribute))]
        public async Task<IActionResult> Authenticate([FromBody] UserForAuthenticationDto userDto)
        {
            var userId = await _service.AuthenticationService.ValidateUser(userDto);
                
            return Ok(new
            {
                Token = await _service.AuthenticationService.CreateToken(),
                UserId = userId,
            });
        }
    }
}
