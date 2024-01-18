using CityInfo.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CityInfo.Entities
{
    public class City
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Population { get; set; }
        public string GoogleMapsURL { get; set; }
        public ICollection<PointOfInterest> PointsOfInterest { get; set; }
            = new List<PointOfInterest>();

        public City() { }

        public City(CityDto cityDto) {
            Id = cityDto.Id;
            Name = cityDto.Name;
            Description = cityDto.Description;
            Population = cityDto.Population;
            GoogleMapsURL = cityDto.GoogleMapsURL;
            cityDto.PointsOfInterest
                .ForEach(poi => PointsOfInterest.Add(new PointOfInterest(poi)));
        }
    }
}
