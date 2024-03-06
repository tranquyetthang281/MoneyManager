namespace MoneyManager.Server.Contracts.RepositoryContracts
{
    public interface IRepositoryManager
    {
        IUserRepository User { get; }

        IWalletRepository Wallet { get; }

        ICategoryRepository Category { get; }

        IFriendshipRepository Friendship { get; }

        ITransactionRepository Transaction { get; }

        IUserWalletRepository UserWallet { get; }

        Task SaveAsync();
    }
}
