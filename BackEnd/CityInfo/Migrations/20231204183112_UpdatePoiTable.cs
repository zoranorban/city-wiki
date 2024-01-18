using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CityInfo.Migrations
{
    public partial class UpdatePoiTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GoogleMapsURL",
                table: "PointsOfInterest",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "PointsOfInterest",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GoogleMapsURL",
                table: "PointsOfInterest");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "PointsOfInterest");
        }
    }
}
