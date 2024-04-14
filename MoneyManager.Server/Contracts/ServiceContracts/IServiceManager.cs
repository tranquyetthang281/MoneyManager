namespace MoneyManager.Server.Contracts.ServiceContracts
{
    public interface IServiceManager
    {
        IUserService UserService { get; }

        IWalletService WalletService { get; }

        IFriendshipService FriendshipService { get; }

        ITransactionService TransactionService { get; }

        ICategoryService CategoryService { get; }

        IAuthenticationService AuthenticationService { get; }
    }
}
