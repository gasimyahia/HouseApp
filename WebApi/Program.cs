using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Data;
using WebApi.Helpers.Mapping;
using WebApi.Middlewares;
using WebApi.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
var secretKey=builder.Configuration.GetSection("AppSettings:Key").Value;
var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(op=>{
        op.TokenValidationParameters=new TokenValidationParameters
        {
            ValidateIssuerSigningKey=true,
            ValidateIssuer=false,
            ValidateAudience=false,
            IssuerSigningKey=key
        };
    });


var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapControllers();

app.Run();
