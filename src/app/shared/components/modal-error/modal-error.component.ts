import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

  @Input() message='';
  @Input() isRedirect=true;
  @Input() txtButton='Volver al inicio'
  constructor(public dialogRef: MatDialogRef<ModalErrorComponent>, private _router:Router) { }

  ngOnInit(): void {
  }

  goHome(){
    this.dialogRef.close(true);
    window.scroll({ top: 0, behavior: 'smooth' });
    if(this.isRedirect)  this._router.navigateByUrl('/');
  }

}
