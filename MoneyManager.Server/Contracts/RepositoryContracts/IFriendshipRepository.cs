using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Contracts.RepositoryContracts
{
    public interface IFriendshipRepository
    {
        Task<IEnumerable<Friendship>> GetFriendshipsOfUserAsync(Guid userId, bool isAccepted, bool trackChanges);

        Task<IEnumerable<Friendship>> GetFriendshipsFromUser(Guid userId, bool isAccepted, bool trackChanges);

        Task<IEnumerable<Friendship>> GetFriendshipsFromFriends(Guid userId, bool isAccepted, bool trackChanges);

        Task<Friendship?> GetFriendshipAsync(Guid userId, Guid friendId, bool trackChanges);

        Task<Friendship?> GetFriendshipOfTwoUsersAsync(Guid userId1, Guid userId2, bool trackChanges);
    
        void CreateFriendship(Friendship friendship);
        
        void DeleteFriendship(Friendship friendship);
    }
}
