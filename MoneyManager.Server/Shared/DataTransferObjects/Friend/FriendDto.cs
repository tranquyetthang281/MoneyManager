namespace MoneyManager.Server.Shared.DataTransferObjects.Friend
{
    public record FriendDto(
        Guid Id,
        string Email,
        string Name,
        DateTime BirthDate,
        string Avatar,
        int status
    );
}
