using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TradeByte.Migrations
{
    /// <inheritdoc />
    public partial class ModifyConversationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_Users_ReceiverId",
                table: "Conversations");

            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_Users_SenderId",
                table: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Conversations_ReceiverId",
                table: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Conversations_SenderId",
                table: "Conversations");

            migrationBuilder.DropColumn(
                name: "ReceiverId",
                table: "Conversations");

            migrationBuilder.DropColumn(
                name: "SenderId",
                table: "Conversations");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_User1Id",
                table: "Conversations",
                column: "User1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_User2Id",
                table: "Conversations",
                column: "User2Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_Users_User1Id",
                table: "Conversations",
                column: "User1Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_Users_User2Id",
                table: "Conversations",
                column: "User2Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_Users_User1Id",
                table: "Conversations");

            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_Users_User2Id",
                table: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Conversations_User1Id",
                table: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Conversations_User2Id",
                table: "Conversations");

            migrationBuilder.AddColumn<int>(
                name: "ReceiverId",
                table: "Conversations",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SenderId",
                table: "Conversations",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_ReceiverId",
                table: "Conversations",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_SenderId",
                table: "Conversations",
                column: "SenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_Users_ReceiverId",
                table: "Conversations",
                column: "ReceiverId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_Users_SenderId",
                table: "Conversations",
                column: "SenderId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
