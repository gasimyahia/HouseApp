import { HousingService } from 'src/app/services/housing.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Property } from 'src/app/model/property';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailsResolverService implements Resolve<Property> {

constructor(private housingService:HousingService,private router:Router) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Property | Observable<Property> | Promise<Property> {
    const propId=route.params['id'];
    // resolve route case error redirect to error page else return date
    return this.housingService.getProperty(+propId).pipe(
      catchError(error =>{
        this.router.navigate(['/']);
        return of(null);
      })
    );
}

}
