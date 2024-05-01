﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MoneyManager.Server.Repository;

#nullable disable

namespace MoneyManager.Server.Migrations
{
    [DbContext(typeof(RepositoryContext))]
    [Migration("20240429111915_InitialDatabase")]
    partial class InitialDatabase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.27")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole<System.Guid>", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("345c9ba5-4135-428c-8592-f343e8456e00"),
                            ConcurrencyStamp = "a4a92634-6f20-4c56-8ef5-99cb44aed8b4",
                            Name = "ApplicationUser",
                            NormalizedName = "APPLICATIONUSER"
                        },
                        new
                        {
                            Id = new Guid("51c67b79-efd4-44d1-9dc1-86932e4b1b18"),
                            ConcurrencyStamp = "014b7098-c30d-4c3e-8b00-a259ef616831",
                            Name = "Administrator",
                            NormalizedName = "ADMINISTRATOR"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);

                    b.HasData(
                        new
                        {
                            UserId = new Guid("89bedf82-3511-4565-9f44-08dc678e154f"),
                            RoleId = new Guid("51c67b79-efd4-44d1-9dc1-86932e4b1b18")
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("MoneyManager.Server.Entities.Models.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Avatar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = new Guid("0cbd4c1a-e11b-4d44-96d2-b47b7ceca7f4"),
                            Avatar = "/food-and-beverage.png",
                            Name = "Food & Beverage",
                            Type = -1
                        },
                        new
                        {
                            Id = new Guid("2a821a31-af92-432f-be3a-d51becfb8d60"),
                            Avatar = "/transportation.png",
                            Name = "Transportation",
                            Type = -1
                        },
                        new
                        {
                            Id = new Guid("468882be-3467-4537-bca7-0b59368a1e1f"),
                            Avatar = "/rentals.png",
                            Name = "Rentals",
                            Type = -1
                        },
                        new
                        {
                            Id = new Guid("47b7bea2-b474-4d6a-82d1-08b52190eaab"),
                            Avatar = "/bill.png",
                            Name = "Bill",
                            Type = -1
                        },
                        new
                        {
                            Id = new Guid("49c7d810-e5f4-4b27-b89c-51b06d3cff12"),
                            Avatar = "/education.png",
                            Name = "Education",
                            Type = -1
                        },
                        new
                        {
                            Id = new Guid("5ce2742d-14ac-4227-8548-9f6ed8f0a989"),
                            Avatar = "/shopping.png",
                            Name = "Shopping",
                            Type = -1
                        },
                        new
                        {
                            Id = new Guid("79fb5982-a325-4ed7-9087-f82240438b59"),
                            Avatar = "/sport.png",
                            Name = "Sport",
                            Type = -1
                        },
                        new
                        {
                            Id = new Guid("841cb344-b768-45e9-85d7-ca588a956d11"),
                            Avatar = "/clothes.png",
                            Name = "Clothes",
                            Type = -1
                        },
                        new
                        {
                            Id = new Guid("8608f8c2-6587-49d3-9fc0-e7fca31d4eef"),
                            Avatar = "/coffee.png",
                            Name = "Coffee",
                            Type = -1
                        },
                        new
                        {
                            Id = new Guid("8979b4b9-551a-47f5-b6be-eae4236c089c"),
                            Avatar = "/pay-interest.png",
                            Name = "Pay Interest",
                            Type = -1
                        },
                        new
                        {
                            Id = new Guid("95cee5df-b529-4a4e-8a87-db06a5244458"),
                            Avatar = "/give-gifts.png",
                            Name = "Give Gifts",
                            Type = -1
                        },
                        new
                        {
                            Id = new Guid("a1d5fbaa-58d4-436a-8f89-0df1c2e1912b"),
                            Avatar = "/outgoing-transfer.png",
                            Name = "Outgoing Transfer",
                            Type = -1
                        },
                        new
                        {
                            Id = new Guid("a9dd513c-b656-44ab-9f37-accf194ccd9e"),
                            Avatar = "/salary.png",
                            Name = "Salary",
                            Type = 1
                        },
                        new
                        {
                            Id = new Guid("af853a77-43a1-4264-af16-bddcaedce257"),
                            Avatar = "/receive-gifts.png",
                            Name = "Receive Gifts",
                            Type = 1
                        },
                        new
                        {
                            Id = new Guid("d0841186-ed4b-4121-a135-a33df149b576"),
                            Avatar = "/incoming-transfer.png",
                            Name = "Incoming Transfer",
                            Type = 1
                        });
                });

            modelBuilder.Entity("MoneyManager.Server.Entities.Models.Friendship", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("FriendId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsAccepted")
                        .HasColumnType("bit");

                    b.HasKey("UserId", "FriendId");

                    b.HasIndex("FriendId");

                    b.ToTable("Friendships");
                });

            modelBuilder.Entity("MoneyManager.Server.Entities.Models.Transaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CreatorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("TransferredTransactionId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("TransferredUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("TransferredWalletId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("WalletId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("CreatorId");

                    b.HasIndex("TransferredTransactionId");

                    b.HasIndex("TransferredUserId");

                    b.HasIndex("TransferredWalletId");

                    b.HasIndex("WalletId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("MoneyManager.Server.Entities.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Avatar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("BirthDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("89bedf82-3511-4565-9f44-08dc678e154f"),
                            AccessFailedCount = 0,
                            Avatar = "",
                            BirthDate = new DateTime(2024, 4, 29, 18, 19, 15, 457, DateTimeKind.Local).AddTicks(861),
                            ConcurrencyStamp = "63383ca2-7095-4f01-b64d-1300bb105922",
                            Email = "tranquyetthang@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            Name = "Admin",
                            NormalizedEmail = "TRANQUYETTHANG@GMAIL.COM",
                            NormalizedUserName = "TRANQUYETTHANG@GMAIL.COM",
                            PasswordHash = "AQAAAAEAACcQAAAAEB379vq/qZdSLItdOiUraUCoRUFNv3i83tpIOLelk0kZ2539tYf47ACWVLsXOl/wtw==",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserName = "tranquyetthang@gmail.com"
                        });
                });

            modelBuilder.Entity("MoneyManager.Server.Entities.Models.UserWallet", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("WalletId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("Balance")
                        .HasColumnType("decimal(18,2)");

                    b.Property<bool>("IsOwner")
                        .HasColumnType("bit");

                    b.HasKey("UserId", "WalletId");

                    b.HasIndex("WalletId");

                    b.ToTable("UserWallets");
                });

            modelBuilder.Entity("MoneyManager.Server.Entities.Models.Wallet", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Avatar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Balance")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("InitBalance")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Wallets");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<System.Guid>", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.HasOne("MoneyManager.Server.Entities.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.HasOne("MoneyManager.Server.Entities.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<System.Guid>", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MoneyManager.Server.Entities.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.HasOne("MoneyManager.Server.Entities.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MoneyManager.Server.Entities.Models.Friendship", b =>
                {
                    b.HasOne("MoneyManager.Server.Entities.Models.User", "Friend")
                        .WithMany("InvitedFriendships")
                        .HasForeignKey("FriendId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("MoneyManager.Server.Entities.Models.User", "User")
                        .WithMany("Friendships")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Friend");

                    b.Navigation("User");
                });

            modelBuilder.Entity("MoneyManager.Server.Entities.Models.Transaction", b =>
                {
                    b.HasOne("MoneyManager.Server.Entities.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MoneyManager.Server.Entities.Models.User", "Creator")
                        .WithMany()
                        .HasForeignKey("CreatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MoneyManager.Server.Entities.Models.Transaction", "TransferredTransaction")
                        .WithMany()
                        .HasForeignKey("TransferredTransactionId");

                    b.HasOne("MoneyManager.Server.Entities.Models.User", "TransferredUser")
                        .WithMany()
                        .HasForeignKey("TransferredUserId");

                    b.HasOne("MoneyManager.Server.Entities.Models.Wallet", "TransferredWallet")
                        .WithMany("IncomingTransactions")
                        .HasForeignKey("TransferredWalletId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MoneyManager.Server.Entities.Models.Wallet", "Wallet")
                        .WithMany("Transactions")
                        .HasForeignKey("WalletId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Creator");

                    b.Navigation("TransferredTransaction");

                    b.Navigation("TransferredUser");

                    b.Navigation("TransferredWallet");

                    b.Navigation("Wallet");
                });

            modelBuilder.Entity("MoneyManager.Server.Entities.Models.UserWallet", b =>
                {
                    b.HasOne("MoneyManager.Server.Entities.Models.User", "User")
                        .WithMany("UserWallets")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MoneyManager.Server.Entities.Models.Wallet", "Wallet")
                        .WithMany("UserWallets")
                        .HasForeignKey("WalletId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");

                    b.Navigation("Wallet");
                });

            modelBuilder.Entity("MoneyManager.Server.Entities.Models.User", b =>
                {
                    b.Navigation("Friendships");

                    b.Navigation("InvitedFriendships");

                    b.Navigation("UserWallets");
                });

            modelBuilder.Entity("MoneyManager.Server.Entities.Models.Wallet", b =>
                {
                    b.Navigation("IncomingTransactions");

                    b.Navigation("Transactions");

                    b.Navigation("UserWallets");
                });
#pragma warning restore 612, 618
        }
    }
}