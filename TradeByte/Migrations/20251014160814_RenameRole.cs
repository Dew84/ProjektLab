using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TradeByte.Migrations
{
    /// <inheritdoc />
    public partial class RenameRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Roles",
                newName: "Key");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Key",
                table: "Roles",
                newName: "Name");
        }
    }
}
