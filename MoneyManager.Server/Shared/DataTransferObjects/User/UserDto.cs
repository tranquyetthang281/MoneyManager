namespace MoneyManager.Server.Shared.DataTransferObjects.User
{
    public record UserDto(
        Guid Id,
        string Email,
        string Name,
        DateTime BirthDate,
        string Avatar
    );
}
