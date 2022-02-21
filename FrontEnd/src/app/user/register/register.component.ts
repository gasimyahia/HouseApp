import { AlertifyService } from './../../services/alertify.service';
import { User } from './../../model/user';
import { UserServiceService } from './../../services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User;
  userSubmited:boolean=false;
  registrationForm:FormGroup;

  constructor(private fb:FormBuilder,
              private userService:UserServiceService,
              private alertifyService:AlertifyService) { }

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationForm=this.fb.group({
      userName:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.minLength(8)]],
      cpassword:[null,Validators.required],
      mobile:[null,[Validators.required,Validators.maxLength(13)]]
    },{validators :this.passwordMatchingValidator});
  }

  passwordMatchingValidator(fg:AbstractControl){
    return fg.get('password').value === fg.get('cpassword').value ? null : {'notmatched':true};
  }

  onSubmit(){
    this.userSubmited=true;
    if(this.registrationForm.valid){
      //this.user=Object.assign(this.user,this.registrationForm.value);
      this.userService.addUser(this.userData())
      this.registrationForm.reset();
      this.userSubmited=false;
      this.alertifyService.success('Congrats,you are Seccussfully Registered!');
    }else{
      this.alertifyService.error('Kindly provide the required fields!');
    }
  }

  userData():User{
    return this.user={
      userName:this.userName.value,
      email:this.email.value,
      password:this.password.value,
      mobile:this.mobile.value
    }
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
