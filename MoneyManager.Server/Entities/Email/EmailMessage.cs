using MimeKit;

namespace MoneyManager.Server.Entities.Email
{
    public class EmailMessage
    {
        public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public string Link { get; set; }
        public EmailMessage(IEnumerable<string> to, string subject, string name, string content, string link)
        {
            To = new List<MailboxAddress>();
            To.AddRange(to.Select(x => new MailboxAddress(null, x)));
            Name = name;
            Subject = subject;
            Content = content;
            Link = link;
        }
    }
}
