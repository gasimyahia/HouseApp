import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertypase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  propertyId:number ;
  property=new Property();

  constructor(private route:ActivatedRoute,
              private router:Router,
              private housingService:HousingService) { }

  ngOnInit() {
    this.propertyId=Number(this.route.snapshot.params['id']);
    // to update id in pagenation
    this.route.params.subscribe(
      (param)=>{
        this.propertyId=+param['id'];
        this.housingService.getProperty(this.propertyId).subscribe(
          (data:IPropertyBase) => {
            this.property=data
          }
        );
      }
    );
  }



}
