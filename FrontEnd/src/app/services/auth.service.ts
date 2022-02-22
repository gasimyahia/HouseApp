import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }
  authUser(user:User){
    let users:User[]=[];
    if(localStorage.getItem('Users')){
      users=JSON.parse(localStorage.getItem('Users'));
    }
    return users.find(p=>p.userName==user.userName && p.password==user.password);
  }
}
