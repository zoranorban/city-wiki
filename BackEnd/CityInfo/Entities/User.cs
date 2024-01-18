using CityInfo.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CityInfo.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }


        public User() { }

        public User(UserDto userDto)
        {
            Id = userDto.Id;
            UserName = userDto.UserName;
            Password = userDto.Password;
            IsAdmin = userDto.IsAdmin;
           
        }
    }
}
