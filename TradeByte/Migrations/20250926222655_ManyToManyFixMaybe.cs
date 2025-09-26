using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TradeByte.Migrations
{
    /// <inheritdoc />
    public partial class ManyToManyFixMaybe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Classifieds_ClassifiedId",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_ClassifiedId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "ClassifiedId",
                table: "Categories");

            migrationBuilder.CreateTable(
                name: "CategoryClassified",
                columns: table => new
                {
                    CategoriesId = table.Column<int>(type: "INTEGER", nullable: false),
                    ClassifiedsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryClassified", x => new { x.CategoriesId, x.ClassifiedsId });
                    table.ForeignKey(
                        name: "FK_CategoryClassified_Categories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryClassified_Classifieds_ClassifiedsId",
                        column: x => x.ClassifiedsId,
                        principalTable: "Classifieds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryClassified_ClassifiedsId",
                table: "CategoryClassified",
                column: "ClassifiedsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryClassified");

            migrationBuilder.AddColumn<int>(
                name: "ClassifiedId",
                table: "Categories",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ClassifiedId",
                table: "Categories",
                column: "ClassifiedId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Classifieds_ClassifiedId",
                table: "Categories",
                column: "ClassifiedId",
                principalTable: "Classifieds",
                principalColumn: "Id");
        }
    }
}
