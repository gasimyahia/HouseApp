import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { Property } from 'src/app/model/property';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  sellRent=1;
  Properties:Property[];
  city:string='';
  searchCity:string='';
  SortBy:string='';
  sortDiretion:string='asc';

  constructor(private route:ActivatedRoute,private housingService:HousingService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
      this.sellRent=2;
    }
    this.housingService.getAllProperties(this.sellRent).subscribe({
      next:(data)=>{
        this.Properties=data;
      },
      error:(e)=>{
        console.log("httpError : " + e);
      }
    });
  }

  onCityFilter(){
    this.searchCity=this.city;
  }

  onCityClear(){
    this.searchCity='';
    this.city='';
  }

  onSortBy(){
    if(this.sortDiretion=='desc'){
      this.sortDiretion='asc';
    }else{
      this.sortDiretion='desc';
    }
  }

}
