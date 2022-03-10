using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Dtos;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public AccountController(IUnitOfWork uow,IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
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
            loginResponse.Token="GENERATE NEW TOKEN";
            return Ok(loginResponse);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(LoginRequestDto loginReq)
        {
            var user= mapper.Map<User>(loginReq);
            var result = await uow.UserRepository.FindUser(user);
            if(result != null){
                return BadRequest("User is all Ready exists");
            }

            await uow.UserRepository.Register(user); 
            await uow.SaveChangesAsync(); 

            return Ok(loginReq);
        }
    }
}