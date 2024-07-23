import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactModel } from '../../model/contact.model';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-addcontact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ToastModule, CommonModule, RippleModule, ButtonModule],
  templateUrl: './addcontact.component.html',
  styleUrl: './addcontact.component.css'
})

export class AddcontactComponent {
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

  constructor(private router: Router, private msg: MessageService, private contacts: ContactService){

  }

  addData(){
    this.contacts.addContact(this.contact).subscribe(data => {
      console.log(data);
      if(data.message == "Success"){
        this.loadHome();
        this.msg.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully' });
      }
      else{
        this.msg.add({ severity: 'info', summary: 'Info', detail: 'Something went wrong' });
      }
    });
  }

  loadHome(){
    this.router.navigate(["home"])
  }

  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("flag");
    this.router.navigate(["login"]);
  }

}
