using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string UserNmae,string password);
        public void Register(string UserNmae, string password);
        Task<bool> UserAlreadyExists(string Username);
    }
}