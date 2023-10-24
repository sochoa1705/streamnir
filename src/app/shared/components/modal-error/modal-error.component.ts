import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

  @Input() message='';
  @Input() isRedirect=true;
  @Input() txtButton='Volver al inicio';

  constructor(public activeModal: NgbActiveModal, private _router:Router, private _checkoutService:CheckoutService) { }

  ngOnInit(): void {
    
  }

  goHome(){
    this.activeModal.close();
    window.scroll({ top: 0, behavior: 'smooth' });
    if(this.isRedirect) {
      this._checkoutService.resetValuesForms();
      this._router.navigateByUrl('/');
    }
  }

}
