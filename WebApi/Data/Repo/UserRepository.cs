using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
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
            var user= await dc.Users.FirstOrDefaultAsync(x => x.Username == UserNmae );
            if(user == null || user.PasswordKey==null)
            return null;

            if(!MatchPasswordHash(password,user.Password,user.PasswordKey))
            return null;

            return user;
        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using(var hmac =new HMACSHA512(passwordKey))
            {
                var  passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));

                for(int i=0; i<passwordHash.Length;i++)
                {
                    if(passwordHash[i] != password[i])
                    return false;
                }
                return true;

            }
        }

        public void Register(string UserNmae, string password)
        {
            byte[] passwordHash,passwordKey;
            using(var hmac =new HMACSHA512())
            {
                passwordKey=hmac.Key;
                passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

            User user=new User();
            user.Username=UserNmae;
            user.Password=passwordHash;
            user.PasswordKey=passwordKey;

            dc.Users.Add(user);
        }

        public Task<bool> UserAlreadyExists(string Username)
        {
            return dc.Users.AnyAsync(x=> x.Username == Username);
        }
    }
}