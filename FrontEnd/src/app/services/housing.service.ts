import { Property } from 'src/app/model/property';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPropertyBase } from '../model/ipropertypase';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) {
  }

  getAllProperties(SellRent?:number):Observable<IPropertyBase[]>{
    return this.http.get('assets/data/properties.json').pipe(
      map((data:any) =>{
        const localProperties=JSON.parse(localStorage.getItem('newProp'));
        const propertiesArray:Array<IPropertyBase>=[];

        if(localProperties){
          for(const id in localProperties){
            if(SellRent){
              if(localProperties.hasOwnProperty(id) && localProperties[id].SellRent == SellRent){
                propertiesArray.push(localProperties[id]);
              }
            }else{
              propertiesArray.push(localProperties[id]);
            }
          }
        }

        for(const id in data){
          if(SellRent){
            if(data.hasOwnProperty(id) && data[id].SellRent === SellRent){
              propertiesArray.push(data[id]);
            }
          }else{
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
    );
  }

  addProperty(property:Property){
    let newProp=[property]
    if(localStorage.getItem('newProp')){
      newProp=[property, ...JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem("newProp",JSON.stringify(newProp));
  }

  getProperty(id:number){
    return this.getAllProperties().pipe(
      map(propertyArray=>{
        return propertyArray.find(p=> p.Id == id);
      })
    );
  }

  newPropID(){
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID',String(+localStorage.getItem('PID')+1));
      return +localStorage.getItem('PID');
    }else{
      localStorage.setItem('PID','101');
      return 101;
    }
  }
}
