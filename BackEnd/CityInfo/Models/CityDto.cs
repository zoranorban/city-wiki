using CityInfo.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net.Sockets;

namespace CityInfo.Models
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [MinLength(10)]
        public string Description { get; set; }
        public int Population { get; set; }
        public string GoogleMapsURL { get; set; }

        public List<PointOfInterestDto> PointsOfInterest { get; set; } = new List<PointOfInterestDto>();

        public CityDto() { }
        public CityDto(int id, string name, string description)
        {
            Id = id;
            Name = name;
            Description = description;
        }

        public CityDto(City city)
        {
            Id = city.Id;
            Name = city.Name;
            Description = city.Description;
            Population = city.Population;
            GoogleMapsURL = city.GoogleMapsURL;
            foreach (var item in city.PointsOfInterest)
            {
                PointsOfInterest.Add(new PointOfInterestDto(item));
            }
        }
    }
}
