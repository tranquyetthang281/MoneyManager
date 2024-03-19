using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Contracts;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Entities.Models;
using MoneyManager.Server.Entities.Exceptions;
using AutoMapper;
using MoneyManager.Server.Shared.DataTransferObjects.User;

namespace MoneyManager.Server.Service
{
    internal sealed class UserService : IUserService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;

        public UserService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync(bool trackChanges)
        {
            var users = await _repository.User.GetAllUsersAsync(trackChanges);
            var userDtos = _mapper.Map<IEnumerable<UserDto>>(users);
            return userDtos;
        }

        public async Task<UserDto> GetUserAsync(Guid id, bool trackChanges)
        {
            var user = await _repository.User.GetUserAsync(id, trackChanges);
            if (user is null)
                throw new UserNotFoundException(id);
            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

        public async Task CheckIfUserExists(Guid userId, bool trackChanges)
        {
            var user = await _repository.User.GetUserAsync(userId, trackChanges);
            if (user is null)
                throw new UserNotFoundException(userId);
        }

        public async Task<UserDto> CreateUserAsync(UserForCreationDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            _repository.User.CrateUser(user);
            await _repository.SaveAsync();
            var userToReturn = _mapper.Map<UserDto>(user);
            return userToReturn;
        }

        public async Task DeleteUserAsync(Guid id, bool trackChanges)
        {
            var user = await GetUserAndCheckIfItExists(id, trackChanges);
            _repository.User.DeleteUser(user);
            await _repository.SaveAsync();
        }

        public async Task UpdateUserAsync(Guid id, UserForUpdateDto userDto, bool trackChanges)
        {
            var user = await GetUserAndCheckIfItExists(id, trackChanges);
            _mapper.Map(userDto, user);
            await _repository.SaveAsync();
        }

        public async Task<(UserForUpdateDto userToPatch, User userEntity)> GetUserForPatchAsync(Guid id, bool trackChanges)
        {
            var user = await GetUserAndCheckIfItExists(id, trackChanges);
            var userToPatch = _mapper.Map<UserForUpdateDto>(user);
            return (userToPatch, user);
        }

        public async Task SaveChangesForPatchAsync(UserForUpdateDto userToPatch, User userEntity)
        {
            _mapper.Map(userToPatch, userEntity);
            await _repository.SaveAsync();
        }

        private async Task<User> GetUserAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var user = await _repository.User.GetUserAsync(id, trackChanges);
            if (user is null)
                throw new UserNotFoundException(id);
            return user;
        }
    }
}
