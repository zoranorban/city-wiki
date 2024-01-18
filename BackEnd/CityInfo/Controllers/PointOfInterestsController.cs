using CityInfo.Contexts;
using CityInfo.Models;
using CityInfo.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;


namespace CityInfo.Controllers
{
    [ApiController]
    [Route("/api/cities/{cityId}/pointsofinterest")]
    public class PointOfInterestsController : Controller
    {
        private CityInfoContext _ctx;

        public PointOfInterestsController(CityInfoContext ctx)
        {
            _ctx = ctx ?? throw new ArgumentNullException(nameof(ctx));
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetPointsOfInterests(int cityId)
        {
            var city = _ctx.Cities.Where(item => item.Id == cityId).FirstOrDefault();

            if (city == null)
            {
                return NotFound();
            }

            List<PointOfInterestDto> pointOfInterestDtos = new List<PointOfInterestDto>();
            var pointOfInterests = _ctx.PointsOfInterest.Where(item => item.CityId == cityId);

            foreach (var item in pointOfInterests)
            {
                pointOfInterestDtos.Add(new PointOfInterestDto(item));
            }

            return Ok(pointOfInterestDtos);
        }

        [HttpGet]
        [Route("{Id}")]
        public IActionResult GetPointsOfInterestsById(int cityId, int id)
        {
            var city = _ctx.Cities.Where(item => item.Id == cityId).FirstOrDefault();

            if (city == null)
            {
                return NotFound();
            }

            var poi =_ctx.PointsOfInterest.Where(item => item.CityId == cityId && item.Id == id).FirstOrDefault();

            if (poi == null)
            {
                return NotFound();
            }

            return Ok(new PointOfInterestDto(poi));
        }

        [HttpPost]
        [Route("")]
        public IActionResult CreatePointsOfInterest(int cityId, [FromBody] PointOfInterestDto poiFromBody)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var city = _ctx.Cities.Where(item => item.Id == cityId).FirstOrDefault();

            if (city == null)
            {
                return NotFound();
            }

            //if (poi.Name.Length < 10)
            //{
            //    ModelState.AddModelError(
            //        "Name",
            //        "tul rovid. Legalabb 10 karakter"
            //    );
            //}

            //if (poi.Description.Length < 10)
            //{
            //    ModelState.AddModelError(
            //        "Description",
            //        "tul rovid. Legalabb 10 karakter"
            //    );
            //}

            var poiEntity = new PointOfInterest(poiFromBody);
            poiEntity.CityId = cityId;
            _ctx.PointsOfInterest.Add(poiEntity);
            _ctx.SaveChanges();

            return Ok(poiEntity.Id);
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdatePoitnsOfInterest(int cityId, int id, [FromBody] PointOfInterestDto poiFromBody)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var city = _ctx.Cities.Where(item => item.Id == cityId).FirstOrDefault();
            if (city == null)
            {
                return NotFound();
            }

            var poi = _ctx.PointsOfInterest.Where(item => item.CityId == cityId && item.Id == id).FirstOrDefault();
            if (poi == null)
            {
                return NotFound();
            }

            poi.Name = poiFromBody.Name;
            poi.Description = poiFromBody.Description;
            poi.GoogleMapsURL = poiFromBody.GoogleMapsURL;
            poi.Image = poiFromBody.Image;
            _ctx.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeletePointOfInterest(int cityId, int id)
        {
            var city = _ctx.Cities.Where(item => item.Id == cityId).FirstOrDefault();

            if (city == null)
            {
                return NotFound();
            }

            var poi = _ctx.PointsOfInterest.Where(item => item.Id == id && item.CityId == cityId).FirstOrDefault();

            if (poi == null)
            {
                return NotFound();
            }

            _ctx.PointsOfInterest.Remove(poi);
            _ctx.SaveChanges();

            return Ok();
        }

    }
}
