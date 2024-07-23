import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { ContactModel } from '../model/contact.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  baseApiUrl: string = "https://localhost:7209";
  
  constructor(private dialog: MatDialog, private http: HttpClient) { }

  openPopup() {
    this.dialog.open(PopupComponent, { width: '80%', height: '70%' });
  }

  closePopup(){
    this.dialog.closeAll();
  }

  getContactByID(rowId: string): Observable<ContactModel>{
    return this.http.get<ContactModel>(`${this.baseApiUrl}/api/Contact/GetContactByID?rowId=` + rowId);
  }

  updateContact(contactObj: ContactModel){
    return this.http.post<any>(`${this.baseApiUrl}/api/Contact/UpdateContact`, contactObj);
  }

  deleteContact(contactObj: ContactModel){
    return this.http.post<any>(`${this.baseApiUrl}/api/Contact/DeleteContact`, contactObj);
  }
}
