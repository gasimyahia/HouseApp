using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Data;
using WebApi.Helpers.Mapping;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using WebApi.Middlewares;
using WebApi.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options=> 
    options.UseSqlServer(builder.Configuration.GetConnectionString("default_db")));

builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();

builder.Services.ConfigureCORS();
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseCors();
app.MapControllers();

app.Run();
