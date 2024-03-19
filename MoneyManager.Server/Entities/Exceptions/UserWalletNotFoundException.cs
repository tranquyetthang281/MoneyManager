namespace MoneyManager.Server.Entities.Exceptions
{
    public class UserWalletNotFoundException : NotFoundException
    {
        public UserWalletNotFoundException(Guid userId, Guid walletId) 
            : base($"UserWallet with userId: {userId} and walletId: {walletId} doesn't exist in the database.")
        {
        }
    }
}
