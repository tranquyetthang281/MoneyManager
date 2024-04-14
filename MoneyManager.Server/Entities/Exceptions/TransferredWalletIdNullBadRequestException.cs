namespace MoneyManager.Server.Entities.Exceptions
{
    public class TransferredWalletIdNullBadRequestException : BadRequestException
    {
        public TransferredWalletIdNullBadRequestException() 
            : base("TransferredWalletId must be not null in TransferToWallet transaction.")
        {
        }
    }
}
