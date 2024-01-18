using CityInfo.Entities;

namespace CityInfo.Models
{
    public class UserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }


        public UserDto() { }

        public UserDto(User user)
        {
            Id = user.Id;
            UserName = user.UserName;
            Password = user.Password;
            IsAdmin = user.IsAdmin;
        }
    }
}
