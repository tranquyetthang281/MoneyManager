using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoneyManager.Server.Migrations
{
    public partial class InitialData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name", "Type" },
                values: new object[,]
                {
                    { new Guid("0e9bccba-2b85-43e0-b096-3b798c6b28de"), "Transfer to wallet", -2 },
                    { new Guid("223d9e18-0cff-4d16-8388-a25e32563e7d"), "Incoming Transfer", 1 },
                    { new Guid("4a858dc4-1a14-446c-b35b-fb5191b22f54"), "Outgoing Transfer", -1 },
                    { new Guid("8b84d87b-5cc7-44af-b461-e6ccd55b916a"), "Receive from wallet", 2 },
                    { new Guid("b10d4c05-49b6-410c-bc78-2d54a9991870"), "Salary", 1 },
                    { new Guid("b11d4c05-49b6-410c-bc78-2d54a9991870"), "Food and Beverage", -1 },
                    { new Guid("d10d4c05-49b6-410c-bc78-2d54a9991870"), "Transfer to friend", -3 },
                    { new Guid("d11d4c05-49b6-410c-bc78-2d54a9991870"), "Receive from friend", 3 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Avatar", "BirthDate", "Email", "Name", "Password" },
                values: new object[,]
                {
                    { new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"), "", new DateTime(2024, 3, 6, 16, 11, 57, 180, DateTimeKind.Local).AddTicks(1461), "user2@gmail.com", "User2", "Password" },
                    { new Guid("7fb7c5fa-9477-4275-8157-66874fcc18af"), "", new DateTime(2024, 3, 6, 16, 11, 57, 180, DateTimeKind.Local).AddTicks(1487), "user3@gmail.com", "User3", "Password" },
                    { new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"), "", new DateTime(2024, 3, 6, 16, 11, 57, 180, DateTimeKind.Local).AddTicks(1448), "user1@gmail.com", "User1", "Password" }
                });

            migrationBuilder.InsertData(
                table: "Wallets",
                columns: new[] { "Id", "Balance", "InitBalance", "Name" },
                values: new object[,]
                {
                    { new Guid("a10d4c05-49b6-410c-bc78-2d54a9991870"), 200000m, 0m, "Wallet1" },
                    { new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870"), 0m, 0m, "WalletWithUser2" }
                });

            migrationBuilder.InsertData(
                table: "Friendships",
                columns: new[] { "FriendId", "UserId" },
                values: new object[] { new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"), new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870") });

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "Id", "Amount", "CategoryId", "CreatorId", "Date", "Note", "TransferredUserId", "TransferredWalletId", "WalletId" },
                values: new object[,]
                {
                    { new Guid("4a07904d-65a3-4d0b-b908-b2f375ddc82b"), -200000m, new Guid("b11d4c05-49b6-410c-bc78-2d54a9991870"), new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"), new DateTime(2024, 3, 6, 16, 11, 57, 180, DateTimeKind.Local).AddTicks(1833), "first trans", null, null, new Guid("a10d4c05-49b6-410c-bc78-2d54a9991870") },
                    { new Guid("9082a3c8-da0c-4715-acca-7bc230d44e4a"), 200000m, new Guid("d11d4c05-49b6-410c-bc78-2d54a9991870"), new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"), new DateTime(2024, 3, 6, 16, 11, 57, 180, DateTimeKind.Local).AddTicks(1849), null, null, null, new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870") },
                    { new Guid("c9cfa872-433d-47fa-9f5a-abbd27f7a2df"), -200000m, new Guid("d10d4c05-49b6-410c-bc78-2d54a9991870"), new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"), new DateTime(2024, 3, 6, 16, 11, 57, 180, DateTimeKind.Local).AddTicks(1852), null, new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"), null, new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870") },
                    { new Guid("cf9ddca2-02e0-4403-9d4f-12b4e3c6c739"), 400000m, new Guid("b10d4c05-49b6-410c-bc78-2d54a9991870"), new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"), new DateTime(2024, 3, 6, 16, 11, 57, 180, DateTimeKind.Local).AddTicks(1837), "second trans", null, null, new Guid("a10d4c05-49b6-410c-bc78-2d54a9991870") }
                });

            migrationBuilder.InsertData(
                table: "UserWallets",
                columns: new[] { "UserId", "WalletId", "Balance", "IsOwner" },
                values: new object[,]
                {
                    { new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"), new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870"), -200000m, false },
                    { new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"), new Guid("a10d4c05-49b6-410c-bc78-2d54a9991870"), 200000m, true },
                    { new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"), new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870"), 200000m, true }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0e9bccba-2b85-43e0-b096-3b798c6b28de"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("223d9e18-0cff-4d16-8388-a25e32563e7d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("4a858dc4-1a14-446c-b35b-fb5191b22f54"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8b84d87b-5cc7-44af-b461-e6ccd55b916a"));

            migrationBuilder.DeleteData(
                table: "Friendships",
                keyColumns: new[] { "FriendId", "UserId" },
                keyValues: new object[] { new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"), new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870") });

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: new Guid("4a07904d-65a3-4d0b-b908-b2f375ddc82b"));

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: new Guid("9082a3c8-da0c-4715-acca-7bc230d44e4a"));

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: new Guid("c9cfa872-433d-47fa-9f5a-abbd27f7a2df"));

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: new Guid("cf9ddca2-02e0-4403-9d4f-12b4e3c6c739"));

            migrationBuilder.DeleteData(
                table: "UserWallets",
                keyColumns: new[] { "UserId", "WalletId" },
                keyValues: new object[] { new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"), new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870") });

            migrationBuilder.DeleteData(
                table: "UserWallets",
                keyColumns: new[] { "UserId", "WalletId" },
                keyValues: new object[] { new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"), new Guid("a10d4c05-49b6-410c-bc78-2d54a9991870") });

            migrationBuilder.DeleteData(
                table: "UserWallets",
                keyColumns: new[] { "UserId", "WalletId" },
                keyValues: new object[] { new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"), new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870") });

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("7fb7c5fa-9477-4275-8157-66874fcc18af"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b10d4c05-49b6-410c-bc78-2d54a9991870"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b11d4c05-49b6-410c-bc78-2d54a9991870"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d10d4c05-49b6-410c-bc78-2d54a9991870"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d11d4c05-49b6-410c-bc78-2d54a9991870"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"));

            migrationBuilder.DeleteData(
                table: "Wallets",
                keyColumn: "Id",
                keyValue: new Guid("a10d4c05-49b6-410c-bc78-2d54a9991870"));

            migrationBuilder.DeleteData(
                table: "Wallets",
                keyColumn: "Id",
                keyValue: new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870"));
        }
    }
}
