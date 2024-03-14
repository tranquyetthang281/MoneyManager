using Microsoft.EntityFrameworkCore;
using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Repository
{
    public sealed class FriendshipRepository : RepositoryBase<Friendship>, IFriendshipRepository
    {
        public FriendshipRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<Guid>> GetAllFriendsOfUserAsync(Guid userId, bool trackChanges)
            => await FindByCondition(f => (f.UserId == userId || f.FriendId == userId) && f.IsAccepted, trackChanges)
                                   .Select(f => f.UserId == userId ? f.FriendId : f.UserId).ToListAsync();

        public async Task<IEnumerable<Guid>> GetAllFriendRequestsFromUserAsync(Guid userId, bool trackChanges)
            => await FindByCondition(f => f.UserId == userId && !f.IsAccepted, trackChanges)
                                    .Select(f => f.FriendId).ToListAsync();

        public async Task<IEnumerable<Guid>> GetAllFriendRequestsForUserAsync(Guid userId, bool trackChanges)
            => await FindByCondition(f => f.FriendId == userId && !f.IsAccepted, trackChanges)
                                    .Select(f => f.UserId).ToListAsync();

        public void CreateFriendship(Friendship friendship) => Create(friendship);

        public void DeleteFriendship(Friendship friendship) => Delete(friendship);

        public async Task<Friendship?> GetFriendshipAsync(Guid userId, Guid friendId, bool trackChanges)
            => await FindByCondition(f => f.UserId == userId && f.FriendId == friendId, trackChanges).SingleOrDefaultAsync();

        public async Task<Friendship?> GetAnyFriendshipAsync(Guid userId1, Guid userId2, bool trackChanges)
            => await FindByCondition(f => f.UserId == userId1 && f.FriendId == userId2 ||
                                            f.UserId == userId2 && f.FriendId == userId1, trackChanges).SingleOrDefaultAsync();
    }
}
