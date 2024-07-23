import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ContactModel } from '../../model/contact.model';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { ButtonRendererComponent } from './button-renderer.component';
import { GridOptions } from '@ag-grid-community/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  colDefs: ColDef[] = [
    { field: "firstName", flex: 1 },
    { field: "lastName", flex: 1 },
    { field: "email", flex: 1 },
    { field: "phoneNumber", flex: 1 },
    { field: "address", flex: 1 },
    { field: "city", flex: 1 },
    { field: "state", flex: 1 },
    { field: "country", flex: 1 },
    { field: "postalCode", flex: 1 },
    { field: "action", flex: 1, cellRenderer: ButtonRendererComponent }
  ];

  contacts: any;

  constructor(private contact:ContactService, private router: Router){
    
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.contact.getContact().subscribe(data => {
      this.contacts = data;
    });
  }

  loadAddContact(){
    this.router.navigate(["addcontact"])
  }

  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("flag");
    this.router.navigate(["login"]);
  }

}
