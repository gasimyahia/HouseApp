using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Data;
using WebApi.Helpers.Mapping;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options=> 
    options.UseSqlServer(builder.Configuration.GetConnectionString("default_db")));

builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();

builder.Services.AddCors(options=>{
    options.AddDefaultPolicy(bu=>{
        bu.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
    });
});
builder.Services.AddControllers().AddNewtonsoftJson();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseExceptionHandler(
        options=>{
            options.Run(
                async context=>{
                    context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
                    var ex=context.Features.Get<IExceptionHandlerFeature>();
                    if(ex != null){
                        await context.Response.WriteAsync(ex.Error.Message);
                    }
                }
            );
        }
    );
}

app.UseAuthorization();
app.UseCors();
app.MapControllers();

app.Run();
