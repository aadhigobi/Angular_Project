import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseApiUrl: string = "https://localhost:7209";

  constructor(private http:HttpClient, private router:Router) { }

  login(userObj: UserModel){
    return this.http.post<any>(`${this.baseApiUrl}/api/User/UserLogin`, userObj);
  }
}
