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
        Task<User> Register(User user);
        Task<User> FindUser(User user);
    }
}