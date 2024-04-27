namespace MoneyManager.Server.Entities.Exceptions
{
    public sealed class UnconfirmedEmailBadRequestException : BadRequestException
    {
        public UnconfirmedEmailBadRequestException() 
            : base("The email has not been confirmed.")
        {
        }
    }
}
