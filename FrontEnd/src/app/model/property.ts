import { IPropertyBase } from "./ipropertybase";

export class Property implements IPropertyBase{
  Id:number;
  SellRent:number;
  Name:string;
  PType:string;
  FType:string;
  Price:number;
  BHK:number;
  BuiltArea:number
  CarpetArea?:number
  Address:string;
  Address2?:string;
  City:string;
  FloorNo?:string;
  TotalFloor?:string;
  RTM:number;
  AOP?:string;
  MainEntrance?:string;
  Security?:number;
  Geted?:number;
  Maintenance?:number;
  Possession?:number;
  Image?:string;
  Description?:string;
  PostedOn:string;
  PostedBy:string;
}
