namespace MoneyManager.Server.Service.Enum
{
    public enum CategoryType
    {
        TransferToFriend = -3,
        TransferToWallet = -2,
        Incoming = -1,
        Outgoing = 1,
        ReceiveFromWallet = 2,
        ReceiveFromFriend = 3,
    }
}
