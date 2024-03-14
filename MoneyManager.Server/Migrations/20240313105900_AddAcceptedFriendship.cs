using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoneyManager.Server.Migrations
{
    public partial class AddAcceptedFriendship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("7fb7c5fa-9477-4275-8157-66874fcc18af"));

            migrationBuilder.AddColumn<bool>(
                name: "IsAccepted",
                table: "Friendships",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name", "Type" },
                values: new object[,]
                {
                    { new Guid("11df7966-4cf9-4e61-a4f9-44bf05943291"), "Transfer to wallet", -2 },
                    { new Guid("38921507-54eb-4144-bc79-2acba72721ed"), "Incoming Transfer", 1 },
                    { new Guid("cc9c3367-0759-4605-b3fa-68ac93f6cbff"), "Outgoing Transfer", -1 },
                    { new Guid("f1fd2612-727e-4c31-b141-5ab01803fc75"), "Receive from wallet", 2 }
                });

            migrationBuilder.UpdateData(
                table: "Friendships",
                keyColumns: new[] { "FriendId", "UserId" },
                keyValues: new object[] { new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"), new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870") },
                column: "IsAccepted",
                value: true);

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "Id", "Amount", "CategoryId", "CreatorId", "Date", "Note", "TransferredUserId", "TransferredWalletId", "WalletId" },
                values: new object[,]
                {
                    { new Guid("15d7b142-953a-4d1e-b5f8-29611daffecc"), 200000m, new Guid("d11d4c05-49b6-410c-bc78-2d54a9991870"), new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"), new DateTime(2024, 3, 13, 17, 58, 59, 682, DateTimeKind.Local).AddTicks(9352), null, null, null, new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870") },
                    { new Guid("260dd0e8-9da8-4ba3-a138-2beff708eeb4"), -200000m, new Guid("d10d4c05-49b6-410c-bc78-2d54a9991870"), new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"), new DateTime(2024, 3, 13, 17, 58, 59, 682, DateTimeKind.Local).AddTicks(9360), null, new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"), null, new Guid("a11d4c05-49b6-410c-bc78-2d54a9991870") },
                    { new Guid("dee6b887-d6ee-4bf2-84cb-2f08a3d729b3"), 400000m, new Guid("b10d4c05-49b6-410c-bc78-2d54a9991870"), new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"), new DateTime(2024, 3, 13, 17, 58, 59, 682, DateTimeKind.Local).AddTicks(9347), "second trans", null, null, new Guid("a10d4c05-49b6-410c-bc78-2d54a9991870") },
                    { new Guid("f40706b7-d44a-4b08-b2b6-bb9046a1b439"), -200000m, new Guid("b11d4c05-49b6-410c-bc78-2d54a9991870"), new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"), new DateTime(2024, 3, 13, 17, 58, 59, 682, DateTimeKind.Local).AddTicks(9342), "first trans", null, null, new Guid("a10d4c05-49b6-410c-bc78-2d54a9991870") }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"),
                column: "BirthDate",
                value: new DateTime(2024, 3, 13, 17, 58, 59, 682, DateTimeKind.Local).AddTicks(8784));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"),
                column: "BirthDate",
                value: new DateTime(2024, 3, 13, 17, 58, 59, 682, DateTimeKind.Local).AddTicks(8769));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Avatar", "BirthDate", "Email", "Name", "Password" },
                values: new object[] { new Guid("2f51bdda-fd03-4083-85cf-04d7af7f9caa"), "", new DateTime(2024, 3, 13, 17, 58, 59, 682, DateTimeKind.Local).AddTicks(8864), "user3@gmail.com", "User3", "Password" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("11df7966-4cf9-4e61-a4f9-44bf05943291"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("38921507-54eb-4144-bc79-2acba72721ed"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("cc9c3367-0759-4605-b3fa-68ac93f6cbff"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f1fd2612-727e-4c31-b141-5ab01803fc75"));

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: new Guid("15d7b142-953a-4d1e-b5f8-29611daffecc"));

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: new Guid("260dd0e8-9da8-4ba3-a138-2beff708eeb4"));

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: new Guid("dee6b887-d6ee-4bf2-84cb-2f08a3d729b3"));

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: new Guid("f40706b7-d44a-4b08-b2b6-bb9046a1b439"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("2f51bdda-fd03-4083-85cf-04d7af7f9caa"));

            migrationBuilder.DropColumn(
                name: "IsAccepted",
                table: "Friendships");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name", "Type" },
                values: new object[,]
                {
                    { new Guid("0e9bccba-2b85-43e0-b096-3b798c6b28de"), "Transfer to wallet", -2 },
                    { new Guid("223d9e18-0cff-4d16-8388-a25e32563e7d"), "Incoming Transfer", 1 },
                    { new Guid("4a858dc4-1a14-446c-b35b-fb5191b22f54"), "Outgoing Transfer", -1 },
                    { new Guid("8b84d87b-5cc7-44af-b461-e6ccd55b916a"), "Receive from wallet", 2 }
                });

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

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"),
                column: "BirthDate",
                value: new DateTime(2024, 3, 6, 16, 11, 57, 180, DateTimeKind.Local).AddTicks(1461));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"),
                column: "BirthDate",
                value: new DateTime(2024, 3, 6, 16, 11, 57, 180, DateTimeKind.Local).AddTicks(1448));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Avatar", "BirthDate", "Email", "Name", "Password" },
                values: new object[] { new Guid("7fb7c5fa-9477-4275-8157-66874fcc18af"), "", new DateTime(2024, 3, 6, 16, 11, 57, 180, DateTimeKind.Local).AddTicks(1487), "user3@gmail.com", "User3", "Password" });
        }
    }
}
