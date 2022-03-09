using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface ICityRepository
    {
         Task<IEnumerable<City>> getCitiesAsync();
         void AddCity(City city);
         void DeleteCity(int cityId);
         Task<City>  FindCity(int cityId);
         void updateCity(City city);
    }
}