namespace MoneyManager.Server.Entities.Exceptions
{
    public class TransactionIsNotInWalletBadRequestException : BadRequestException
    {
        public TransactionIsNotInWalletBadRequestException(Guid transactionId, Guid walletId)
            : base($"The transaction with id: {transactionId} is not in the wallet with id: {walletId}")
        {
        }
    }
}
