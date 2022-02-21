import { IProperty } from './../../model/IProperty';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  sellRent=1;
  Properties:IProperty[];

  constructor(private route:ActivatedRoute,private housingService:HousingService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
      this.sellRent=2;
    }
    this.housingService.getAllProperties(this.sellRent).subscribe({
      next:(data)=>{
        this.Properties=data;
        this.Properties= this.Properties.filter(p=> p.SellRent===this.sellRent);
      },
      error:(e)=>{
        console.log("httpError : " + e);
      }
    });
  }

}
