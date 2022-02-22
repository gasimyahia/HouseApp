import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User;
  constructor(private authService:AuthService,
              private alertify:AlertifyService,
              private router:Router) { }

  ngOnInit() {
  }

  onLogin(loginForm:NgForm){
    this.user={
      userName:loginForm.controls['userName'].value,
      password:loginForm.controls['password'].value,
      email:null,
      mobile:null
    }
    const token=this.authService.authUser(this.user);
    if(token){
      localStorage.setItem('token',token.userName)
      this.router.navigate(['/']);
      loginForm.reset();
      this.alertify.success("Login Successful");
    }else{
      this.alertify.error('Login not Successful');
    }
  }

}
