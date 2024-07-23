import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs';
import { ContactModel } from '../model/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseApiUrl: string = "https://localhost:7209";

  constructor(private http:HttpClient, private router:Router) {

  }

  getContact(): Observable<ContactModel[]>{
    return this.http.get<ContactModel[]>(`${this.baseApiUrl}/api/Contact/GetContact`);
  }

  addContact(contactObj: ContactModel){
    return this.http.post<any>(`${this.baseApiUrl}/api/Contact/AddContact`, contactObj);
  }
}
