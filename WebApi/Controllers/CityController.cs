using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Data.Repo;
using WebApi.Models;
//using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityRepository cityRepo;

        public CityController(ICityRepository cityRepo)
        {
            this.cityRepo = cityRepo;
        }

        [HttpGet("")]
        public async Task<IActionResult> Get()
        {
            var cities=await cityRepo.getCitiesAsync();
            return Ok(cities);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCity([FromBody]City city)
        {
            cityRepo.AddCity(city);
            var result= await cityRepo.SaveAsync();
            return StatusCode(201);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            cityRepo.DeleteCity(id);
            await cityRepo.SaveAsync();
            return Ok(id);
        }

    }
}