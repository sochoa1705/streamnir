import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { GlobalComponent } from '../../global';
import { getUrlSearchByKayak } from '../../utils/getParamsKayak';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

  @Input() message='';
  @Input() isRedirect=true;
  @Input() txtButton='Volver al inicio';

  constructor(
    public activeModal: NgbActiveModal, 
    private _router:Router, 
    private _checkoutService:CheckoutService,
    private _routeActivate: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    
  }

  goHome(){
    this.activeModal.close();
    window.scroll({ top: 0, behavior: 'smooth' });
    if (this.isRedirect) {
      if(GlobalComponent.isKayak){
        const paramMap = this._routeActivate.snapshot.paramMap;
        const urlSearchByKayak=getUrlSearchByKayak(paramMap);
        this._router.navigateByUrl(urlSearchByKayak);
      }else{
        const searchParams = JSON.stringify(localStorage.getItem('searchParams')).replace(/['"]+/g, '');
        this._checkoutService.resetValuesForms();
        this._router.navigateByUrl(searchParams);
      }
    }
  }

}
