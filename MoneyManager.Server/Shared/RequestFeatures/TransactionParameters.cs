namespace MoneyManager.Server.Shared.RequestFeatures
{
    public class TransactionParameters
    {
        public TransactionParameters()
        {
            Time = DateTime.Now;
        }

        public DateTime Time { get; set; }
    }
}
