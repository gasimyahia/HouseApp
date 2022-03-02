import { Component, Input, OnInit } from '@angular/core';
import { IPropertyBase } from 'src/app/model/ipropertypase';
import { Property } from 'src/app/model/property';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  @Input() property :Property ;
  @Input() hideIcon:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
