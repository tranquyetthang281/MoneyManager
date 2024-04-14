namespace MoneyManager.Server.Entities.Exceptions
{
    public sealed class UserNotFoundException : NotFoundException
    {
        public UserNotFoundException(Guid id) 
            : base($"The user with id: {id} doesn't exist in the database.")
        {
        }

        public UserNotFoundException(string email)
           : base($"The user with email: {email} doesn't exist in the database.")
        {
        }
    }
}
