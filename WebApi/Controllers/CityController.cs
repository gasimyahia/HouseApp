using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data.Repo;
using WebApi.Models;
using WebApi.Interfaces;
using WebApi.Dtos;
using AutoMapper;
using System.Collections;
using Microsoft.AspNetCore.JsonPatch;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public CityController(IUnitOfWork uow,IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet("")]
        public async Task<IActionResult> Get()
        {
            throw new UnauthorizedAccessException();
            var cities=await uow.CityRepository.getCitiesAsync();
            // var dto=cities.Select(x=> new CityDto(){ Id=x.Id,Name=x.Name });

            var citiesDto= mapper.Map<IEnumerable<CityDto>>(cities);

            return Ok(citiesDto);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCity([FromBody]CityDto cityDto)
        {
            throw new Exception("enternal server error!");
            var city=mapper.Map<City>(cityDto);
            city.LastUpdatedBy=1;
            city.LastUpdatedOn=DateTime.Now;
            
            uow.CityRepository.AddCity(city);
            var result= await uow.SaveChangesAsync();
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id,CityDto cityDto)
        {
            if(id !=cityDto.Id){
                return BadRequest("Unable to Update City");
            }
            var city= await uow.CityRepository.FindCity(id);
            if(city==null){
                return BadRequest("city not found");
            }
            mapper.Map(cityDto,city);
            city.LastUpdatedBy=1;
            city.LastUpdatedOn=DateTime.Now;
            
            await uow.SaveChangesAsync();
            return Ok(id);
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id,JsonPatchDocument<City> cityDto)
        {
            var city= await uow.CityRepository.FindCity(id);
            if(city==null){
                return BadRequest("city not found");
            }
            
            city.LastUpdatedBy=1;
            city.LastUpdatedOn=DateTime.Now;
            
            cityDto.ApplyTo(city,ModelState);
            await uow.SaveChangesAsync();
            return Ok(id);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.CityRepository.DeleteCity(id);
            await uow.SaveChangesAsync();
            return Ok(id);
        }

    }
}