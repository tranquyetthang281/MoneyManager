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

        public async Task<IEnumerable<Friendship>> GetFriendshipsOfUserAsync(Guid userId, bool isAccepted, bool trackChanges)
            => await FindByCondition(f => (f.UserId == userId || f.FriendId == userId) 
                                            && (f.IsAccepted == isAccepted), trackChanges).ToListAsync();
        public async Task<IEnumerable<Friendship>> GetFriendshipsFromUser(Guid userId, bool isAccepted, bool trackChanges)
            => await FindByCondition(f => f.UserId == userId && f.IsAccepted == isAccepted, trackChanges).ToListAsync();

        public async Task<IEnumerable<Friendship>> GetFriendshipsFromFriends(Guid userId, bool isAccepted, bool trackChanges)
            => await FindByCondition(f => f.FriendId == userId && f.IsAccepted == isAccepted, trackChanges).ToListAsync();

        public async Task<Friendship?> GetFriendshipAsync(Guid userId, Guid friendId, bool trackChanges)
            => await FindByCondition(f => f.UserId == userId && f.FriendId == friendId, trackChanges).SingleOrDefaultAsync();

        public async Task<Friendship?> GetFriendshipOfTwoUsersAsync(Guid userId1, Guid userId2, bool trackChanges)
            => await FindByCondition(f => f.UserId == userId1 && f.FriendId == userId2 ||
                                            f.UserId == userId2 && f.FriendId == userId1, trackChanges).SingleOrDefaultAsync();
        public void DeleteFriendship(Friendship friendship) => Delete(friendship);
        
        public void CreateFriendship(Friendship friendship) => Create(friendship);
    }
}
