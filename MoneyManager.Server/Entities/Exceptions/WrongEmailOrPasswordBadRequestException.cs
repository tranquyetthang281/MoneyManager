namespace MoneyManager.Server.Entities.Exceptions
{
    public sealed class WrongEmailOrPasswordBadRequestException : BadRequestException
    {
        public WrongEmailOrPasswordBadRequestException() 
            : base("Wrong email or password.")
        {
        }
    }
}
