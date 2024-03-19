using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Shared.DataTransferObjects.Friend
{
    public record FriendForAddToWalletDto
    {
        [Required(ErrorMessage = "FriendId is a required field.")]
        public Guid FriendId { get; init; }
    }
}
