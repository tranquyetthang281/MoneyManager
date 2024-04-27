namespace MoneyManager.Server.Shared.DataTransferObjects.Wallet
{
    public record WalletMemberDto()
    {
        public Guid Id { get; init; }

        public string? Email { get; init; }
       
        public string? Name { get; init; }

        public string? Avatar {  get; init; }
        
        public bool IsOwner {  get; init; }
    }
}
