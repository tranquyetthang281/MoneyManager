namespace MoneyManager.Server.Entities.Exceptions
{
    public class UserIsNotCreatorBadRequestException : BadRequestException
    {
        public UserIsNotCreatorBadRequestException(Guid userId, Guid transactionId) 
            : base($"The user with id: {userId} is not creator of the transaction with id: {transactionId}.")
        {
        }
    }
}
