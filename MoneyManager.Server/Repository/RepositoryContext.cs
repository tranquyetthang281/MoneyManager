using MoneyManager.Server.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Repository.Configuration;
using MoneyManager.Server.Repository.Configuration;

namespace MoneyManager.Server.Repository
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Friendship>().HasKey(f => new { f.UserId, f.FriendId });
            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.User)
                .WithMany(u => u.Friendships)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.Friend)
                .WithMany(u => u.InvitedFriendships)
                .HasForeignKey(f => f.FriendId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserWallet>().HasKey(table => new { table.UserId, table.WalletId });

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.TransferredWallet)
                .WithMany(w => w.IncomingTransactions)
                .HasForeignKey(t => t.TransferredWalletId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Wallet)
                .WithMany(w => w.Transactions)
                .HasForeignKey(t => t.WalletId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new FriendshipConfiguration());
            modelBuilder.ApplyConfiguration(new WalletConfiguration());
            modelBuilder.ApplyConfiguration(new UserWalletConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
            modelBuilder.ApplyConfiguration(new TransactionConfiguration());
        }

        public DbSet<User>? Users { get; set; }
        
        public DbSet<UserWallet>? UserWallets { get; set; }

        public DbSet<Wallet>? Wallets { get; set; }
        
        public DbSet<Category>? Categories { get; set; }
        
        public DbSet<Transaction>? Transactions { get; set; }
        
        public DbSet<Friendship>? Friendships { get; set; }

    }
}