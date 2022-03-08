using Microsoft.EntityFrameworkCore;
using WebApi.Models;
using WebApi.Interfaces;

namespace WebApi.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext dc;

        public CityRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddCity(City city)
        {
            dc.Cities.AddAsync(city);
        }

        public void DeleteCity(int cityId)
        {
            var city=dc.Cities.FindAsync(cityId).Result;
            dc.Cities.Remove(city);
        }

        public async Task<IEnumerable<City>> getCitiesAsync()
        {
            return await dc.Cities.ToListAsync();
        }

    }
}