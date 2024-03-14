namespace MoneyManager.Server.Entities.Exceptions
{
    public class UsersAreNotFriendsException : BadRequestException
    {
        public UsersAreNotFriendsException(Guid userId1, Guid userId2) 
            : base($"User with id: {userId1} and user with id: {userId2} are not friends.")
        {
        }
    }
}
