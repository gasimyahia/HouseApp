using WebApi.Models;

namespace WebApi.Data.Repo
{
    public interface ICityRepository
    {
         Task<IEnumerable<City>> getCitiesAsync();
         void AddCity(City city);
         void DeleteCity(int cityId);
         Task<bool> SaveAsync(); 
    }
}