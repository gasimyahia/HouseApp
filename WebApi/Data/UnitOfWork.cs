using WebApi.Data.Repo;
using WebApi.Interfaces;

namespace WebApi.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;

        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }
        public IUserRepository UserRepository => new UserRepository(dc);
        public ICityRepository CityRepository => new CityRepository(dc);

        public async Task<bool> SaveChangesAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}