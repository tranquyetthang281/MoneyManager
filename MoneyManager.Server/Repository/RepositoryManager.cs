using MoneyManager.Server.Contracts.RepositoryContracts;

namespace MoneyManager.Server.Repository
{
    public sealed class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _repositoryContext;
        private readonly Lazy<IUserRepository> _userRepository;
        private readonly Lazy<IWalletRepository> _walletRepository;
        private readonly Lazy<IUserWalletRepository> _userWalletRepository;
        private readonly Lazy<ICategoryRepository> _categoryRepository;
        private readonly Lazy<ITransactionRepository> _transactionRepository;
        private readonly Lazy<IFriendshipRepository> _friendshipRepository;

        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
            _userRepository = new Lazy<IUserRepository>(() => new UserRepository(repositoryContext));
            _walletRepository = new Lazy<IWalletRepository>(() => new WalletRepository(repositoryContext));
            _userWalletRepository = new Lazy<IUserWalletRepository>(() => new UserWalletRepository(repositoryContext));
            _categoryRepository = new Lazy<ICategoryRepository>(() => new CategoryRepository(repositoryContext));
            _transactionRepository = new Lazy<ITransactionRepository>(() => new TransactionRepository(repositoryContext));
            _friendshipRepository = new Lazy<IFriendshipRepository>(() => new FriendshipRepository(repositoryContext));
        }

        public IUserRepository User => _userRepository.Value;
        public IWalletRepository Wallet => _walletRepository.Value;
        public IUserWalletRepository UserWallet => _userWalletRepository.Value;
        public ITransactionRepository Transaction => _transactionRepository.Value;
        public ICategoryRepository Category => _categoryRepository.Value;
        public IFriendshipRepository Friendship => _friendshipRepository.Value;

        public async Task SaveAsync() => await _repositoryContext.SaveChangesAsync();
    }
}
