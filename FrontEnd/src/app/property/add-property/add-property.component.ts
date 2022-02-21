import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
@ViewChild('Form') addProprety:NgForm;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("form submeted");
    console.log(this.addProprety);

  }

  onBack(){
    this.router.navigate(['/']);
  }

}
