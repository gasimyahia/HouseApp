import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm:FormGroup;

  constructor() { }

  ngOnInit() {
    this.registrationForm=new FormGroup({
      userName:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(10)]),
      cpassword:new FormControl(null,[Validators.required]),
      mobile:new FormControl(null,[Validators.required,Validators.maxLength(13)])
    },this.passwordMatchingValidator);
  }

  passwordMatchingValidator(fg:AbstractControl){
    return fg.get('password').value === fg.get('cpassword').value ? null : {'notmatched':true};
  }

  onSubmit(){
    console.log(this.registrationForm);
  }

  // form geters
  get userName(){
    return this.registrationForm.get('userName') as FormControl;
  }
  get email(){
    return this.registrationForm.get('email') as FormControl;
  }
  get password(){
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword(){
    return this.registrationForm.get('cpassword') as FormControl;
  }
  get mobile(){
    return this.registrationForm.get('mobile') as FormControl;
  }

}
