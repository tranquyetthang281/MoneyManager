namespace MoneyManager.Server.Entities.Exceptions
{
    public sealed class AuthenticationFailedBadRequestException : BadRequestException
    {
        public AuthenticationFailedBadRequestException() 
            : base("Authentication failed. Wrong user name or password.")
        {
        }
    }
}
