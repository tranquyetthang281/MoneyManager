namespace MoneyManager.Server.Shared.DataTransferObjects.User
{
    public record UserForCreationDto(
        string Email,
        string Password,
        string Name,
        DateTime BirthDate,
        string Avatar
    );
}
