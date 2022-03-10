using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebApi.Dtos;
using WebApi.Models;

namespace WebApi.Helpers.Mapping
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City,CityDto>().ReverseMap();

            CreateMap<User,LoginRequestDto>().ReverseMap();
        }
    }
}