namespace MoneyManager.Server.Entities.Exceptions
{
    public sealed class IdParametersBadRequestException : BadRequestException
    {
        public IdParametersBadRequestException()
        : base("Parameter ids is null")
        {
        }
    }

}
