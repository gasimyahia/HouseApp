using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Extensions
{
    public static class ExceptionsMiddlewareExtensions
    {
        public static void ConfigureExtceptionsHandler(this IServiceCollection services, IConfiguration configuration){
            app.UseExceptionHandler(
            options=>{
                options.Run(
                    async context=>{
                        context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
                        var ex=context.Features.Get<IExceptionHandlerFeature>();
                        if(ex != null){
                            await context.Response.WriteAsync(ex.Error.Message);
                        }
                    }
                );
                }
            ); 
        }
    }
}