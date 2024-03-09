namespace MoneyManager.Server.Contracts.ServiceContracts
{
    public interface IServiceManager
    {
        IUserService UserService { get; }

        IWalletService WalletService { get; }

        IUserWalletService UserWalletService { get; }

        IFrienshipService FrienshipService { get; }

        ITransactionService TransactionService { get; }

        ICategoryService CategoryService { get; }
    }
}
