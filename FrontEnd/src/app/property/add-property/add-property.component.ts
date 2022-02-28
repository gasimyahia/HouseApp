import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from 'src/app/model/IProperty';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
@ViewChild('Form') addProprety:NgForm;
@ViewChild('propTabs') propTabs:TabsetComponent;
  propertyTypes:Array<string>=['House','Apartment','Duplex'];
  furnishTypes:Array<string>=['Fully','Semi','Unfurnished'];
  propertyView:IProperty={
    Id:null,
    Name:'',
    Price:null,
    SellRent:null,
    Type:null
  };
  constructor(private router:Router) { }

  ngOnInit() {
  }

  selectTab(tabId:number){
    this.propTabs.tabs[tabId].active=true;
  }

  onSubmit(){
    console.log("form submeted");
    console.log(this.addProprety);

  }

  onBack(){
    this.router.navigate(['/']);
  }

}
