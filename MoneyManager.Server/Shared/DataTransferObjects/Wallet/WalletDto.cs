using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Shared.DataTransferObjects.Wallet
{
    public record WalletDto
    {
        public Guid Id { get; init; }

        public string? Name { get; init; }

        public decimal Balance { get; init; }

        public decimal InitBalance { get; init; }
        
        public bool IsOwner { get; init; }

        public decimal UserBalance { get; init; }
    }
}
