using System.ComponentModel.DataAnnotations;

namespace MoneyManager.Server.Shared.DataTransferObjects.Friend
{
    public record FriendForAddToWalletDto
    {
        [Required(ErrorMessage = "FriendID is a required field.")]
        public Guid FriendID;
    }
}
