import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from 'src/app/model/IProperty';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
// @ViewChild('Form') addProprety:NgForm;
@ViewChild('propTabs') propTabs:TabsetComponent;

  addPropertyForm:FormGroup;
  propertyTypes:Array<string>=['House','Apartment','Duplex'];
  furnishTypes:Array<string>=['Fully','Semi','Unfurnished'];
  propertyView:IPropertyBase={
    Id:null,
    Name:'',
    Price:null,
    SellRent:null,
    PType:null,
    FType:null,
    BHK:null,
    BuiltArea:null,
    City:null,
    RTM:null,
    Image:null
  };
  constructor(private fb:FormBuilder, private router:Router) { }

  ngOnInit() {
    this.createAddPropertyForm();
  }

  createAddPropertyForm(){
    this.addPropertyForm=this.fb.group({
      SellRent:[null,Validators.required],
      PType:[null,Validators.required],
      Name:[null,Validators.required],
      Price:[null,Validators.required],
      BuiltArea:[null,Validators.required]
    });
  }

  selectTab(tabId:number){
    this.propTabs.tabs[tabId].active=true;
  }

  onSubmit(){
  }

  onBack(){
    this.router.navigate(['/']);
  }

}
