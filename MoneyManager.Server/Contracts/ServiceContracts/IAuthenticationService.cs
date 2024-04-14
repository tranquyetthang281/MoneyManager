using Microsoft.AspNetCore.Identity;
using MoneyManager.Server.Shared.DataTransferObjects.User;

namespace MoneyManager.Server.Contracts.ServiceContracts
{
    public interface IAuthenticationService
    {
        Task<(IdentityResult result, string token)> RegisterUserAsync(UserForRegistrationDto userDto);

        Task<bool> ConfirmEmailAsync(string token, string email);

        Task<Guid> ValidateUser(UserForAuthenticationDto userForAuth);
        
        Task<string> CreateToken();
    }

}
