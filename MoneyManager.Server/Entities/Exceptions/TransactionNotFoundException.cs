namespace MoneyManager.Server.Entities.Exceptions
{
    public class TransactionNotFoundException : NotFoundException
    {
        public TransactionNotFoundException(Guid id) 
            : base($"The transaction with id: {id} doesn't exist in the database.")
        {
        }
    }
}
