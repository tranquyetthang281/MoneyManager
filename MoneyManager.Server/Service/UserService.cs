﻿using MoneyManager.Server.Contracts.RepositoryContracts;
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
            var usersDto = _mapper.Map<IEnumerable<UserDto>>(users);
            return usersDto;
        }

        public async Task<UserDto> GetUserAsync(Guid id, bool trackChanges)
        {
            var user = await _repository.User.GetUserAsync(id, trackChanges);
            if (user is null)
                throw new UserNotFoundException(id);
            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

        private async Task<User> GetUserAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var user = await _repository.User.GetUserAsync(id, trackChanges);
            if (user is null)
                throw new UserNotFoundException(id);
            return user;
        }

        public async Task<UserDto> CreateUserAsync(UserForCreationDto user)
        {
            var userEntity = _mapper.Map<User>(user);
            _repository.User.CrateUser(userEntity);
            await _repository.SaveAsync();
            var userToReturn = _mapper.Map<UserDto>(userEntity);
            return userToReturn;
        }

        public async Task DeleteUserAsync(Guid id, bool trackChanges)
        {
            var user = await GetUserAndCheckIfItExists(id, trackChanges);
            _repository.User.DeleteUser(user);
            await _repository.SaveAsync();
        }

        public async Task UpdateUserAsync(Guid id, UserForUpdateDto user, bool trackChanges)
        {
            var userEntity = await GetUserAndCheckIfItExists(id, trackChanges);
            _mapper.Map(user, userEntity);
            await _repository.SaveAsync();
        }

        public async Task<(UserForUpdateDto userToPatch, User userEntity)> GetUserForPatchAsync(Guid id, bool trackChanges)
        {
            var userEntity = await GetUserAndCheckIfItExists(id, trackChanges);
            var userToPatch = _mapper.Map<UserForUpdateDto>(userEntity);
            return (userToPatch, userEntity);
        }

        public async Task SaveChangesForPatchAsync(UserForUpdateDto userToPatch, User userEntity)
        {
            _mapper.Map(userToPatch, userEntity);
            await _repository.SaveAsync();
        }
    }
}
