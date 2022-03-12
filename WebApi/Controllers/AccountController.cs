using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebApi.Dtos;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IConfiguration configuration;

        public AccountController(IUnitOfWork uow,IMapper mapper,IConfiguration configuration)
        {
            this.uow = uow;
            this.mapper = mapper;
            this.configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto loginReq)
        {
            var user = await uow.UserRepository.Authenticate(loginReq.UserName,loginReq.Password);
            if(user == null){
                return Unauthorized();
            }

            var loginResponse=new LoginResDto();
            loginResponse.UserName=user.Username;
            loginResponse.Token=CreateJWT(user);
            return Ok(loginResponse);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(LoginRequestDto loginReq)
        {
            if(await uow.UserRepository.UserAlreadyExists(loginReq.UserName))
            {
                return BadRequest("this user is aleady exists, try somesthings else");
            }

            uow.UserRepository.Register(loginReq.UserName,loginReq.Password);
            await uow.SaveChangesAsync();
            return StatusCode(201);
        }

        [NonAction]
        public string CreateJWT(User user){
            var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                configuration.GetSection("AppSettings:Key").Value));
            var claims=new Claim[]{
                new Claim(ClaimTypes.Name,user.Username),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };

            var signingCredentials=new SigningCredentials(key,SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor= new SecurityTokenDescriptor{
                Subject=new ClaimsIdentity(claims),
                Expires=DateTime.UtcNow.AddDays(1),
                SigningCredentials=signingCredentials
            };

            var tokenHandler=new JwtSecurityTokenHandler();
            var token =tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}