using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="Name is mandatory field")]
        [StringLength(50,MinimumLength =2)]
        [RegularExpression(".*[a-zA-Z]+.*",ErrorMessage ="Numerics are not allowed")]
        public string Name { get; set; }
        [Required(ErrorMessage ="Country is mandatory field")]
        [MinLength(2)]
        public string Country { get; set; }
    }
}