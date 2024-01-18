using CityInfo.Entities;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CityInfo.Models
{
    public class PointOfInterestDto : IValidatableObject
    {
        public int Id { get; set; }
        [Required]
        [MinLength(4)]
        [MaxLength(100)]
        public string Name { get; set; }
        [MinLength(4)]
        public string Description { get; set; }
        public string GoogleMapsURL { get; set; }
        public byte[] Image { get; set; }
        public PointOfInterestDto(PointOfInterest pointOfInterest)
        {
            Id = pointOfInterest.Id;
            Name = pointOfInterest.Name;
            Description = pointOfInterest.Description;
            GoogleMapsURL = pointOfInterest.GoogleMapsURL;
            Image = pointOfInterest.Image;
        }

        public PointOfInterestDto()
        {
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();

            if (Name == Description)
            {
                errors.Add(new ValidationResult("Can not match", new List<string> { "Name", "Description" }));
            }

            return errors;
        }
    }
}
