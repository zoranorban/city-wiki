using CityInfo.Contexts;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CityInfo.Controllers
{
    [ApiController]
    public class DummyController : Controller
    {
        private CityInfoContext _ctx;
        public DummyController(CityInfoContext ctx) {
            _ctx = ctx ?? throw new ArgumentNullException(nameof(ctx));

            //_ctx = ctx == null ? throw new ArgumentNullException(nameof(ctx)) : ctx;

            //if (ctx == null) {
            //    throw new ArgumentNullException();
            //}
            //else
            //{
            //    _ctx = ctx;
            //}
        }

        [Route("api/testdatabase")]
        public IActionResult TestDatabase()
        {
            return Ok("Database created");
        }
    }
}
