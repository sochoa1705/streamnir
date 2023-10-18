import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';

@Component({
  selector: 'app-modal-unsaved',
  templateUrl: './modal-unsaved.component.html',
  styleUrls: ['./modal-unsaved.component.scss']
})
export class ModalUnsavedComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,private _checkoutService:CheckoutService, private _router:Router) { }
  isRedirectHome=false;
  ngOnInit(): void {
    this.isRedirectHome=this._checkoutService.currentIndexStep==-1 ? true:false;
    console.log(this.isRedirectHome,'is redirect')
  }

  closeSave(isSaved:boolean){
    this.activeModal.close(isSaved ? 'saved' : 'dont-save');
  }

  redirectHome(){
     this._router.navigateByUrl('/');
  }

}
