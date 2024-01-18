using CityInfo.Contexts;
using CityInfo.Entities;
using CityInfo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CityInfo.Controllers
{
    [ApiController]
    [Route("/api/users")]
    public class UsersController : Controller
    {
        private CityInfoContext _ctx;

        public UsersController(CityInfoContext ctx)
        {
            _ctx = ctx ?? throw new ArgumentNullException(nameof(ctx));
        }


        [HttpPost]
        [Route("login")]
        public IActionResult LoginUser([FromBody] UserDto userDto)
        {
            var user = _ctx.Users.Where(user => user.UserName == userDto.UserName && user.Password == userDto.Password).FirstOrDefault();
            if(user == null)
            {
                return BadRequest(Json("Incorrect username or password"));
            }

            return Ok(Json("Success"));

        }

        [HttpGet]
        [Route("")]
        public IActionResult GetUsers()
        {
            var userEntities = _ctx.Users;
            List<UserDto> userDto = new List<UserDto>();

            foreach (var entities in userEntities)
            {
                userDto.Add(new UserDto(entities));
            }

            return Ok(userDto);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetUserByID(int id)
        {
            User user = _ctx.Users.Where(user => user.Id == id).FirstOrDefault();
            UserDto userDto = new UserDto(user);

            if (userDto == null)
            {
                return NotFound();
            }

            return Ok(userDto);
        }

        [HttpPost]
        [Route("")]
        public IActionResult CreateUser([FromBody] UserDto userDto)
        {
            User user = new User(userDto);
            _ctx.Users.Add(user);
            _ctx.SaveChanges();

            return Ok(user.Id);
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateById(int id, [FromBody] UserDto userFromBody)
        {
            User user = _ctx.Users.Where(user => user.Id == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            user.UserName = userFromBody.UserName;
            user.Password = userFromBody.Password;
            user.IsAdmin = userFromBody.IsAdmin;
            _ctx.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteUserById(int id)
        {
            User user = _ctx.Users.Where(user => user.Id == id).FirstOrDefault();

            if (user == null)
            {
                return NotFound();
            }
            _ctx.Users.Remove(user);
            _ctx.SaveChanges();
            return Ok();
        }
    }
}
