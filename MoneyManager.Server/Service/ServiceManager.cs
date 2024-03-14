using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Contracts;
using MoneyManager.Server.Contracts.ServiceContracts;
using AutoMapper;

namespace MoneyManager.Server.Service
{
    public sealed class ServiceManager : IServiceManager
    {
        private readonly Lazy<IUserService> _userService;
        private readonly Lazy<IFriendshipService> _frienshipService;
        private readonly Lazy<IWalletService> _walletService;
        private readonly Lazy<ITransactionService> _transactionService;
        private readonly Lazy<ICategoryService> _categoryService;


        public ServiceManager(IRepositoryManager repositoryManager, ILoggerManager logger, IMapper mapper)
        {
            _userService = new Lazy<IUserService>(() => new UserService(repositoryManager, logger, mapper));
            _frienshipService = new Lazy<IFriendshipService>(() => new FriendshipService(repositoryManager, logger, mapper));
            _walletService = new Lazy<IWalletService>(() => new WalletService(repositoryManager, logger, mapper));
            _transactionService = new Lazy<ITransactionService>(() => new TransactionService(repositoryManager, logger, mapper));
            _categoryService = new Lazy<ICategoryService>(() => new CategoryService(repositoryManager, logger, mapper));
        }

        public IUserService UserService => _userService.Value;
        public IWalletService WalletService => _walletService.Value;
        public IFriendshipService FriendshipService => _frienshipService.Value;
        public ITransactionService TransactionService => _transactionService.Value;
        public ICategoryService CategoryService => _categoryService.Value;
    }
}
