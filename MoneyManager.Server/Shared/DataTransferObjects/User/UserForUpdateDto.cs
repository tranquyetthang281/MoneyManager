namespace MoneyManager.Server.Shared.DataTransferObjects.User
{
    public record UserForUpdateDto(
        string Password,
        string Name,
        DateTime BirthDate,
        string Avatar
    );
}
