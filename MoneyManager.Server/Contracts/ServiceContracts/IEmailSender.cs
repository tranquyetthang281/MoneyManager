using MoneyManager.Server.Entities.Email;

namespace MoneyManager.Server.Contracts.ServiceContracts
{
    public interface IEmailSender
    {
        Task SendEmailAsync(EmailMessage message);
    }
}
