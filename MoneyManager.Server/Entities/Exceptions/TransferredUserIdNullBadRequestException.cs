namespace MoneyManager.Server.Entities.Exceptions
{
    public class TransferredUserIdNullBadRequestException : BadRequestException
    {
        public TransferredUserIdNullBadRequestException() 
            : base("TransferredUserId must be not null in TransferToFriend transaction.")
        {
        }
    }
}
