using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Contracts;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Shared.DataTransferObjects.User;
using MoneyManager.Server.Entities.Exceptions;
using MoneyManager.Server.Entities.Models;
using MoneyManager.Server.Service.Enum;
using AutoMapper;

namespace MoneyManager.Server.Service
{
    internal sealed class FriendshipService : IFriendshipService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;

        public FriendshipService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetAllFriendsOfUserAsync(Guid userId, bool trackChanges)
        {
            await CheckIfUserExists(userId, trackChanges);
            var friendships = await _repository.Friendship.GetFriendshipsOfUserAsync(userId, isAccepted: true, trackChanges);
            var friendIds = friendships.Select(f => f.UserId == userId ? f.FriendId : f.UserId);
            var friends = await _repository.User.GetManyUsersAsync(friendIds, trackChanges);
            var friendDtos = _mapper.Map<IEnumerable<UserDto>>(friends);
            return friendDtos;
        }

        public async Task<IEnumerable<UserDto>> GetAllFriendRequestsFromUserAsync(Guid userId, bool trackChanges)
        {

            await CheckIfUserExists(userId, trackChanges);
            var friendships = await _repository.Friendship.GetFriendshipsFromUser(userId, isAccepted: false, trackChanges);
            var friendIds = friendships.Select(f => f.FriendId);
            var friends = await _repository.User.GetManyUsersAsync(friendIds, trackChanges);
            var friendDtos = _mapper.Map<IEnumerable<UserDto>>(friends);
            return friendDtos;
        }

        public async Task<IEnumerable<UserDto>> GetAllFriendRequestsForUserAsync(Guid userId, bool trackChanges)
        {
            await CheckIfUserExists(userId, trackChanges);
            var friendships = await _repository.Friendship.GetFriendshipsFromFriends(userId, isAccepted: false, trackChanges);
            var friendIds = friendships.Select(f => f.UserId);
            var friends = await _repository.User.GetManyUsersAsync(friendIds, trackChanges);
            var friendDtos = _mapper.Map<IEnumerable<UserDto>>(friends);
            return friendDtos;
        }

        public async Task AcceptFriendRequestAsync(Guid userId, Guid friendId, bool userTrackChanges, bool friendshipTrackChanges)
        {
            await CheckIfUserExists(userId, userTrackChanges);
            await CheckIfUserExists(friendId, userTrackChanges);

            var friendship = await _repository.Friendship.GetFriendshipAsync(friendId, userId, friendshipTrackChanges);
            if (friendship is null)
                throw new FriendRequestNotFoundException(friendId, userId);

            if (!friendship.IsAccepted)
            {
                friendship.IsAccepted = true;
                await _repository.SaveAsync();
            }
        }

        public async Task SendFriendRequestAsync(Guid userId, Guid friendId, bool trackChanges)
        {
            await CheckIfUserExists(userId, trackChanges);
            await CheckIfUserExists(friendId, trackChanges);

            var friendship = await _repository.Friendship.GetFriendshipOfTwoUsersAsync(userId, friendId, trackChanges);
            if (friendship is null)
            {
                var createdFriendship = new Friendship
                {
                    UserId = userId,
                    FriendId = friendId,
                    IsAccepted = false
                };
                _repository.Friendship.CreateFriendship(createdFriendship);
                await _repository.SaveAsync();
            }
        }

        public async Task<FriendshipStatus> GetFriendshipStatus(Guid userId, Guid friendId, bool trackChanges)
        {
            await CheckIfUserExists(userId, trackChanges);
            await CheckIfUserExists(friendId, trackChanges);

            var friendship = await _repository.Friendship.GetFriendshipOfTwoUsersAsync(userId, friendId, trackChanges);

            if (friendship is null)
                return FriendshipStatus.None;

            if (friendship.IsAccepted)
                return FriendshipStatus.Friend;

            if (friendship.UserId == userId)
                return FriendshipStatus.Requested;

            return FriendshipStatus.Waiting;
        }

        #region Private methods
        private async Task CheckIfUserExists(Guid userId, bool trackChanges)
        {
            var user = await _repository.User.GetUserAsync(userId, trackChanges);
            if (user is null)
                throw new UserNotFoundException(userId);
        }
        #endregion
    }
}
