using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Contracts;
using MoneyManager.Server.Contracts.ServiceContracts;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using MoneyManager.Server.Entities.Models;

namespace MoneyManager.Server.Service
{
    public sealed class ServiceManager : IServiceManager
    {
        private readonly Lazy<IUserService> _userService;
        private readonly Lazy<IFriendshipService> _frienshipService;
        private readonly Lazy<IWalletService> _walletService;
        private readonly Lazy<ITransactionService> _transactionService;
        private readonly Lazy<ICategoryService> _categoryService;
        private readonly Lazy<IAuthenticationService> _authenticationService;

        public ServiceManager(IRepositoryManager repositoryManager, ILoggerManager logger, IMapper mapper,
                IConfiguration configuration, UserManager<User> userManager)
        {
            _userService = new Lazy<IUserService>(() => new UserService(repositoryManager, logger, mapper, userManager));
            _frienshipService = new Lazy<IFriendshipService>(() => new FriendshipService(repositoryManager, logger, mapper));
            _walletService = new Lazy<IWalletService>(() => new WalletService(repositoryManager, logger, mapper));
            _transactionService = new Lazy<ITransactionService>(() => new TransactionService(repositoryManager, logger, mapper));
            _categoryService = new Lazy<ICategoryService>(() => new CategoryService(repositoryManager, logger, mapper));
            _authenticationService = new Lazy<IAuthenticationService>(() => new AuthenticationService(logger, mapper, configuration, userManager));
        }

        public IUserService UserService => _userService.Value;
        public IWalletService WalletService => _walletService.Value;
        public IFriendshipService FriendshipService => _frienshipService.Value;
        public ITransactionService TransactionService => _transactionService.Value;
        public ICategoryService CategoryService => _categoryService.Value;
        public IAuthenticationService AuthenticationService => _authenticationService.Value;
    }
}
