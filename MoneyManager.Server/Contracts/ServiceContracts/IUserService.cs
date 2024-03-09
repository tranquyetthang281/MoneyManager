using MoneyManager.Server.Entities.Models;
using MoneyManager.Server.Shared.DataTransferObjects.User;

namespace MoneyManager.Server.Contracts.ServiceContracts
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync(bool trackChanges);

        Task<UserDto> GetUserAsync(Guid id, bool trackChanges);

        Task<UserDto> CreateUserAsync(UserForCreationDto user);

        Task DeleteUserAsync(Guid id, bool trackChanges);

        Task UpdateUserAsync(Guid id, UserForUpdateDto user, bool trackChanges);

        Task<(UserForUpdateDto userToPatch, User userEntity)> GetUserForPatchAsync(Guid id, bool trackChanges);

        Task SaveChangesForPatchAsync(UserForUpdateDto userToPatch, User userEntity);
    }
}
