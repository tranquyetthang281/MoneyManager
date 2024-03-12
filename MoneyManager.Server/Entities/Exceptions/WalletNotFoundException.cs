namespace MoneyManager.Server.Entities.Exceptions
{
    public sealed class WalletNotFoundException : NotFoundException
    {
        public WalletNotFoundException(Guid id)
            : base($"The wallet with id: {id} doesn't exist in the database.")
        { 
        }
    }
}
