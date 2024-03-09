using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Contracts;
using MoneyManager.Server.Contracts.ServiceContracts;
using AutoMapper;

namespace MoneyManager.Server.Service
{
    internal sealed class FriendshipService : IFrienshipService
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
    }
}
