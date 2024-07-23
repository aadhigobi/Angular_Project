import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-button-renderer',
  template: `<button (click)="onClick()" class="btn btn-primary"><span class="glyphicon glyphicon-edit"></span> Edit</button>`,
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params: any;

  constructor(private popup: PopupService){
        
  }

  agInit(params: any): void {
    this.params = params;
  }

  onClick(): void {
    console.log('Button clicked!', this.params.node.data);
    localStorage.setItem("popupRowId", this.params.node.data.rowId);
    this.popup.openPopup();
  }

  refresh(params: any): boolean {
    return true;
  }
}