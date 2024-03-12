namespace MoneyManager.Server.Entities.Exceptions
{
    public sealed class WalletForbiddenException : ForbiddenException
    {
        public WalletForbiddenException(Guid userID, Guid walletId) 
            : base($"User with id: {userID} is not allowed to enter the wallet with id: {walletId}.")
        {
        }
    }
}
