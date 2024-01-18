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
    [Route("/api/cities")]
    public class CitiesController : Controller
    {
        private CityInfoContext _ctx;

        public CitiesController(CityInfoContext ctx)
        {
            _ctx = ctx ?? throw new ArgumentNullException(nameof(ctx));
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetCities()
        {
            var cityEntities = _ctx.Cities.Include(item => item.PointsOfInterest);
            List<CityDto> cityDto = new List<CityDto>();

            foreach (var entities in cityEntities)
            {
                //CityDto city = new CityDto(entities);
                //cityDto.Add(city);

                cityDto.Add(new CityDto(entities));
            }

            return Ok(cityDto);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetCityByID(int id)
        {
            // List<CityDto> test = cities.Where(city => city.Id == id).ToList();
            //CityDto city = cities.Where(city => city.Id == id).FirstOrDefault();

            //City city = _ctx.Cities.Where(city => city.Id == id).FirstOrDefault(); 
            //City cityEntity = _ctx.Cities.FirstOrDefault(city => city.Id == id);

            // Azert nem toltotte be a points of interstet, mert mi effektiv nem mondtuk meg a kodnak hogy nekunk az is kene
            // Ezert szuksegunk lesz felhasznalni az Include fuggvenyt a Where utan, ami kap parameterkent egy lambda functiont,
            // es itt meg tudjuk adni neki a szukseges kacsolatot city => city.PointsOfinteres

            City city = _ctx.Cities.Where(city => city.Id == id).Include(city => city.PointsOfInterest).FirstOrDefault();
            CityDto cityDto = new CityDto(city);

            if (cityDto == null)
            {
                return NotFound();
            }

            return Ok(cityDto);
        }

        [HttpPost]
        [Route("")]
        public IActionResult CreateCity([FromBody] CityDto cityDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            City city = new City(cityDto);
            _ctx.Cities.Add(city);
            _ctx.SaveChanges();

            //cities.Add(cityDto);
            return Ok(city.Id);
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateById(int id, [FromBody] CityDto cityFromBody)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            City city = _ctx.Cities.Where(city => city.Id == id).FirstOrDefault();
            if (city == null)
            {
                return NotFound();
            }

            city.Name = cityFromBody.Name;
            city.Description = cityFromBody.Description;
            city.Population = cityFromBody.Population;
            city.GoogleMapsURL = cityFromBody.GoogleMapsURL;
            _ctx.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteCityById(int id)
        {
            City city = _ctx.Cities.Where(city => city.Id == id).Include(city => city.PointsOfInterest).FirstOrDefault();

            if (city == null)
            {
                return NotFound();
            }

            foreach (var item in city.PointsOfInterest)
            {
                _ctx.PointsOfInterest.Remove(item);
            }
            _ctx.Cities.Remove(city);
            _ctx.SaveChanges();
            return Ok();
        }


    }
}
