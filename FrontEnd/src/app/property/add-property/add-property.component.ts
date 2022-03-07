import { AlertifyService } from 'src/app/services/alertify.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
// @ViewChild('Form') addProprety:NgForm;
@ViewChild('propTabs') propTabs:TabsetComponent;
isNextClicked:boolean=false;
property=new Property();
cities:string[];

  addPropertyForm:FormGroup;
  propertyTypes:Array<string>=['House','Apartment','Duplex'];
  furnishTypes:Array<string>=['Fully','Semi','Unfurnished'];
  propertyView:Property={
    Id:null,
    SellRent:null,
    Name:null,
    PType:null,
    FType:null,
    Price:null,
    BHK:null,
    BuiltArea:null,
    CarpetArea:null,
    Address:null,
    Address2:null,
    City:'',
    FloorNo:null,
    TotalFloor:null,
    RTM:null,
    AOP:null,
    MainEntrance:null,
    Security:null,
    Gated:null,
    Maintenance:null,
    Possession:null,
    Image:null,
    Description:null,
    PostedOn:null,
    PostedBy:null,
  };
  constructor(private fb:FormBuilder,
              private router:Router,
              private housingService:HousingService,
              private alertify:AlertifyService) { }

  ngOnInit() {
    this.createAddPropertyForm();
    this.housingService.getCities().subscribe({
      next:(data)=>{
        this.cities=data;
        console.log("city :"+data);

      }
    })
  }

  mapProperty():void{
    this.property.Id= this.housingService.newPropID();
    this.property.SellRent=this.SellRent.value;
    this.property.BHK=this.BHK.value;
    this.property.PType=this.PType.value;
    this.property.Name=this.Name.value;
    this.property.City=this.City.value;
    this.property.FType=this.FType.value;
    this.property.Price=this.Price.value;
    this.property.Security=this.Security.value;
    this.property.MainEntrance=this.Maintenance.value;
    this.property.BuiltArea=this.BuildArea.value;
    this.property.CarpetArea=this.CarpetAera.value;
    this.property.FloorNo=this.FloorNo.value;
    this.property.TotalFloor=this.TotalFloor.value;
    this.property.Address=this.Address.value;
    this.property.Address2=this.Landmark.value;
    this.property.RTM=this.ReadyToMove.value;
    this.property.AOP=this.AOP.value;
    this.property.Gated=this.Gated.value;
    this.property.MainEntrance=this.Maintenance.value;
    this.property.Possession=this.Possession.value;
    this.property.Description=this.Description.value;
    this.property.PostedOn=new Date().toString();
  }

  createAddPropertyForm(){
    this.addPropertyForm=this.fb.group({
      BasicInfo:this.fb.group({
        SellRent:['1',Validators.required],
        PType:[null,Validators.required],
        Name:[null,[Validators.required,Validators.minLength(5)]],
        BHK:[null,Validators.required],
        FType:[null,Validators.required],
        City:[null,[Validators.required,Validators.minLength(2)]],
      }),
      PriceInfo:this.fb.group({
        Price:[null,Validators.required],
        BuildArea:[null,Validators.required],
        Security:[null],
        Maintenance:[null],
        CarpetAera:[null]
      }),
      AddressInfo:this.fb.group({
        FloorNo:[null],
        TotalFloor:[null],
        Address:[null],
        Landmark:[null]
      }),
      DetailsInfo:this.fb.group({
        ReadyToMove:[null,Validators.required],
        Possession:[null],
        Age:[null],
        AOP:[null],
        Gated:[null],
        Entrance:[null],
        Description:[null]
      }),
      Photos:this.fb.group({

      })
    });
  }

  selectTab(tabId:number,isCurrentTabValid:boolean){
    this.isNextClicked=true;
    if(isCurrentTabValid){
      this.propTabs.tabs[tabId].active=true;
      this.isNextClicked=false;
    }
  }

  onSubmit(){
    this.isNextClicked=true;
    if(this.isAllTabsValid()){
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success("Add Property Seccussfully!");
      if(this.SellRent.value == '2')
      {
        this.router.navigate(['/rent-property']);
      }else{
        this.router.navigate(['/']);
      }
      this.addPropertyForm.reset();
    }else{
      this.alertify.error('Please review the form and provide all valid entries');
    }
  }

  isAllTabsValid():boolean{
    if(this.getBasicInfo.invalid){
      this.propTabs.tabs[0].active=true;
      return false;
    }
    if(this.getPriceInfo.invalid){
      this.propTabs.tabs[1].active=true;
      return false;
    }
    if(this.getAddressInfo.invalid){
      this.propTabs.tabs[2].active=true;
      return false;
    }
    if(this.getDetailsInfo.invalid){
      this.propTabs.tabs[3].active=true;
      return false;
    }
    if(this.getPhotos.invalid){
      this.propTabs.tabs[4].active=true;
      return false;
    }
    return true;
  }

  onBack(){
    this.router.navigate(['/']);
  }


  //#region <Getter Methods>

  //#region BasicInfo formGroup
  get getBasicInfo(){
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }
  get SellRent(){
    return this.getBasicInfo.controls['SellRent'] as FormControl;
  }
  get Name(){
    return this.getBasicInfo.controls['Name'] as FormControl;
  }
  get BHK(){
    return this.getBasicInfo.controls['BHK'] as FormControl;
  }
  get PType(){
    return this.getBasicInfo.controls['PType'] as FormControl;
  }
  get FType(){
    return this.getBasicInfo.controls['FType'] as FormControl;
  }
  get City(){
    return this.getBasicInfo.controls['City'] as FormControl;
  }
  //#endregion

  //#region Price Info formGroup-----
  get getPriceInfo(){
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }
  get Price(){
    return this.getPriceInfo.controls['Price'] as FormControl;
  }
  get Security(){
    return this.getPriceInfo.controls['Security'] as FormControl;
  }
  get Maintenance(){
    return this.getPriceInfo.controls['Maintenance'] as FormControl;
  }
  get BuildArea(){
    return this.getPriceInfo.controls['BuildArea'] as FormControl;
  }
  get CarpetAera(){
    return this.getPriceInfo.controls['CarpetAera'] as FormControl;
  }
  //#endregion

  //#region  Address Info fromGroup ---------
  get getAddressInfo(){
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }
  get FloorNo(){
    return this.getAddressInfo.controls['FloorNo'] as FormControl;
  }
  get TotalFloor(){
    return this.getAddressInfo.controls['TotalFloor'] as FormControl;
  }
  get Address(){
    return this.getAddressInfo.controls['Address'] as FormControl;
  }
  get Landmark(){
    return this.getAddressInfo.controls['Landmark'] as FormControl;
  }
  //#endregion

  //#region  Details Info ---------
  get getDetailsInfo(){
    return this.addPropertyForm.controls['DetailsInfo'] as FormGroup;
  }
  get ReadyToMove(){
    return this.getDetailsInfo.controls['ReadyToMove'] as FormControl;
  }
  get Possession(){
    return this.getDetailsInfo.controls['Possession'] as FormControl;
  }

  get Age(){
    return this.getDetailsInfo.controls['Age'] as FormControl;
  }

  get AOP(){
    return this.getDetailsInfo.controls['AOP'] as FormControl;
  }
  get Gated(){
    return this.getDetailsInfo.controls['Gated'] as FormControl;
  }

  get Entrance(){
    return this.getDetailsInfo.controls['Entrance'] as FormControl;
  }

  get Description(){
    return this.getDetailsInfo.controls['Description'] as FormControl;
  }
  //#endregion

  //#region  Photo -------
  get getPhotos(){
    return this.addPropertyForm.controls['Photos'] as FormControl;
  }
  //#endregion
  //#endregion

}
