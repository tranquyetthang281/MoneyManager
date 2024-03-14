using MoneyManager.Server.Service.Enum;
using MoneyManager.Server.Shared.DataTransferObjects.User;

namespace MoneyManager.Server.Contracts.ServiceContracts
{
    public interface IFriendshipService
    {
        Task<IEnumerable<UserDto>> GetAllFriendsOfUserAsyncAsync(Guid id, bool trackChanges);

        Task<IEnumerable<UserDto>> GetAllFriendRequestsFromUserAsync(Guid id, bool trackChanges);

        Task<IEnumerable<UserDto>> GetAllFriendRequestsForUserAsync(Guid id, bool trackChanges);

        Task AcceptFriendRequestAsync(Guid userId, Guid friendId, bool userTrackChanges, bool friendshipTrackChanges);

        Task SendFriendRequestAsync(Guid userId, Guid friendId, bool trackChanges);

        Task<FriendshipStatus> GetFriendshipStatus(Guid userId, Guid friendId, bool trackChanges);
    }
}
