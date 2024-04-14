namespace MoneyManager.Server.Entities.Exceptions
{
    public sealed class WalletUpdateForbiddenException : ForbiddenException
    {
        public WalletUpdateForbiddenException(Guid userID, Guid walletId) 
            : base($"The User with id: {userID} is not allowed to update the wallet with id: {walletId}.")
        {
        }
    }
}
