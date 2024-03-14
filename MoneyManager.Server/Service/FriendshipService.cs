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

        private async Task CheckIfUserExists(Guid userId, bool trackChanges)
        {
            var user = await _repository.User.GetUserAsync(userId, trackChanges);
            if (user is null)
                throw new UserNotFoundException(userId);
        }

        public async Task<IEnumerable<UserDto>> GetAllFriendsOfUserAsyncAsync(Guid id, bool trackChanges)
        {
            await CheckIfUserExists(id, trackChanges);
            var friendIds = await _repository.Friendship.GetAllFriendsOfUserAsync(id, trackChanges);
            var friends = await _repository.User.GetUsersAsync(friendIds, trackChanges);
            var friendsDto = _mapper.Map<IEnumerable<UserDto>>(friends);
            return friendsDto;
        }

        public async Task<IEnumerable<UserDto>> GetAllFriendRequestsFromUserAsync(Guid id, bool trackChanges)
        {
            await CheckIfUserExists(id, trackChanges);
            var friendIds = await _repository.Friendship.GetAllFriendRequestsFromUserAsync(id, trackChanges);
            var friends = await _repository.User.GetUsersAsync(friendIds, trackChanges);
            var friendsDto = _mapper.Map<IEnumerable<UserDto>>(friends);
            return friendsDto;
        }

        public async Task<IEnumerable<UserDto>> GetAllFriendRequestsForUserAsync(Guid id, bool trackChanges)
        {
            await CheckIfUserExists(id, trackChanges);
            var friendIds = await _repository.Friendship.GetAllFriendRequestsForUserAsync(id, trackChanges);
            var friends = await _repository.User.GetUsersAsync(friendIds, trackChanges);
            var friendsDto = _mapper.Map<IEnumerable<UserDto>>(friends);
            return friendsDto;
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
            var friendship = await _repository.Friendship.GetAnyFriendshipAsync(userId, friendId, trackChanges);
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
           
            var friendship = await _repository.Friendship.GetAnyFriendshipAsync(userId, friendId, trackChanges);
           
            if (friendship is null)
                return FriendshipStatus.None;

            if (friendship.IsAccepted)
                return FriendshipStatus.Friend;

            if (friendship.UserId == userId)
                return FriendshipStatus.Requested;

            return FriendshipStatus.Waiting;
        }
    }
}
