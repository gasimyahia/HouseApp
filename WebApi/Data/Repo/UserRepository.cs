using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;

        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<User> Authenticate(string UserNmae, string password)
        {
            return await dc.Users.FirstOrDefaultAsync(x => x.Username == UserNmae && x.Password == password);
        }

        public async Task<User> FindUser(User user)
        {
            return await dc.Users.FirstOrDefaultAsync(x=> x.Username == user.Username);
        }

        public async Task<User> Register(User user)
        {
            var result= await dc.Users.AddAsync(user);
            return result.Entity;
        }
    }
}