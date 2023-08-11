import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalComponent } from 'src/app/shared/global';

@Component({
  selector: 'app-modal-insurance',
  templateUrl: './modal-insurance.component.html',
  styleUrls: ['./modal-insurance.component.scss']
})
export class ModalInsuranceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalInsuranceComponent>) { }
  isDomestic=false;
  ngOnInit(): void {
    this.isDomestic=GlobalComponent.isDomestic;
  }
}
