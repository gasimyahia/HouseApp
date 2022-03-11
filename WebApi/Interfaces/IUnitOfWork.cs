namespace WebApi.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository {get;}
         ICityRepository CityRepository {get;}
         Task<bool> SaveChangesAsync();
    }
}