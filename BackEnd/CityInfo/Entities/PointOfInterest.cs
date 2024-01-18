using CityInfo.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CityInfo.Entities
{
    public class PointOfInterest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public City City { get; set; }
        public int CityId { get; set; }
        public string OpenFrom { get; set; }
        public string GoogleMapsURL { get; set; }
        public byte[] Image { get; set; }

        public PointOfInterest() { }
        public PointOfInterest(PointOfInterestDto pointOfInterestDto)
        {
            Id = pointOfInterestDto.Id;
            Name = pointOfInterestDto.Name;
            Description = pointOfInterestDto.Description;
            GoogleMapsURL = pointOfInterestDto.GoogleMapsURL;
            Image = pointOfInterestDto.Image;
        }
    }
}
