using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Helpers.Mapping;
using WebApi.Interfaces;

namespace WebApi.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection ConfigureCORS(this IServiceCollection services)
            => services.AddCors(options =>{
                options.AddDefaultPolicy(bu=>{
                bu.WithOrigins("http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                });
        });

    }
}