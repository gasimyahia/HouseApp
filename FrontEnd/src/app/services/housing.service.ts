import { Property } from 'src/app/model/property';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) {
  }

  getAllProperties(SellRent:number):Observable<any>{
    return this.http.get('assets/data/properties.json');
  }

  addProperty(property:Property){
    localStorage.setItem("newProp",JSON.stringify(property));
  }
}
