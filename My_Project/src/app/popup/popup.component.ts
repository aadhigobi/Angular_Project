import { Component, OnInit } from '@angular/core';
import { PopupService } from '../popup.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactModel } from '../../model/contact.model';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ToastModule, CommonModule, RippleModule, ButtonModule ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})

export class PopupComponent implements OnInit {
  contact: ContactModel ={
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    rowId: ""
  }

  constructor(private popup: PopupService, private router: Router, private msg: MessageService){

  }

  ngOnInit(): void {
    this.popup.getContactByID(localStorage.getItem("popupRowId")!).subscribe(
      data => {
        console.log(data);
        this.contact = data;
    });
  }

  updateData(){
    this.popup.updateContact(this.contact).subscribe(data => {
      console.log(data);
      if(data.message == "Success"){
        window.location.reload();
        this.msg.add({ severity: 'success', summary: 'Success', detail: 'Data updated successfully' });
      }
      else{
        this.msg.add({ severity: 'info', summary: 'Info', detail: 'Something went wrong' });
      }
    });
  }

  deleteData(){
    this.popup.deleteContact(this.contact).subscribe(data =>{
      console.log(data);
      if(data.message == "Success"){
        window.location.reload();
        this.msg.add({ severity: 'success', summary: 'Success', detail: 'Data deleted successfully' });
      }
      else{
        this.msg.add({ severity: 'info', summary: 'Info', detail: 'Something went wrong' });
      }
    });
  }

  closeDialog(){
    localStorage.removeItem("popupRowId");
    this.popup.closePopup();
  }
}
