using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Contracts.RepositoryContracts
{
    public interface IFriendshipRepository
    {
        Task<IEnumerable<Guid>> GetAllFriendsOfUserAsync(Guid userId, bool trackChanges);

        Task<IEnumerable<Guid>> GetAllFriendRequestsFromUserAsync(Guid userId, bool trackChanges);

        Task<IEnumerable<Guid>> GetAllFriendRequestsForUserAsync(Guid userId, bool trackChanges);

        void CreateFriendship(Friendship friendship);

        void DeleteFriendship(Friendship friendship);

        Task<Friendship?> GetFriendshipAsync(Guid userId, Guid friendId, bool trackChanges);

        Task<Friendship?> GetAnyFriendshipAsync(Guid userId1, Guid userId2, bool trackChanges);
    }
}
