import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  sellRent=1;
  Properties:IPropertyBase[]=[];

  constructor(private route:ActivatedRoute,private housingService:HousingService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
      this.sellRent=2;
    }
    this.housingService.getAllProperties(this.sellRent).subscribe({
      next:(data)=>{

        const newProperty=JSON.parse(localStorage.getItem('newProp'));
        console.log("new property ="+newProperty.Name);
        if(newProperty.SellRent == this.sellRent){
          data=[newProperty, ...data];
          console.log("new property ="+newProperty.Name);
        }
        this.Properties=data;
        this.Properties= this.Properties.filter(p=> p.SellRent===this.sellRent);
      },
      error:(e)=>{
        console.log("httpError : " + e);
      }
    });
  }

}
