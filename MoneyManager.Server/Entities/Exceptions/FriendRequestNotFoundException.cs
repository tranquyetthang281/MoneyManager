namespace MoneyManager.Server.Entities.Exceptions
{
    public class FriendRequestNotFoundException : NotFoundException
    {
        public FriendRequestNotFoundException(Guid userId, Guid friendId)
            : base($"The friend request from user with id: {userId} for user with id: {friendId} doesn't exist in the database.") { }
    }
}
