using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyManager.Server.Entities.Models
{
    public class Friendship
    {
        public Guid UserId { get; set; }

        public Guid FriendId { get; set; }

        public virtual User? User { get; set; }

        public virtual User? Friend { get; set; }

    }
}
