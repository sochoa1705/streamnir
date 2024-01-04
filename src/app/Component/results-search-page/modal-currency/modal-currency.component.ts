import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalComponent } from 'src/app/shared/global';

@Component({
  selector: 'app-modal-currency',
  templateUrl: './modal-currency.component.html',
  styleUrls: ['./modal-currency.component.scss']
})
export class ModalCurrencyComponent implements OnInit {

  constructor(@Optional() private _activeModal?: NgbActiveModal) { }

  @Input() currencySelected = 'USD';
  @Output() changeCurrency = new EventEmitter()
  currentCurrency =  'USD';
  exchangeRate = GlobalComponent.appExchangeRate;

  listCurrency=[
    {
      value: 'USD',
      name: 'Dólares',
      checked:false
    },
    {
      value: 'PEN',
      name: 'Soles',
      checked:false
    }
  ]

  ngOnInit(): void {
    this.listCurrency.forEach(item=>{
      if(this.currencySelected==item.value) item.checked=true;
    })
  }

  clickOption(name:string, i:number){
    this.listCurrency.forEach(item=>{
      item.checked=false;
    })
    this.listCurrency[i].checked=true;
    this.currentCurrency=name;
  }

  clickCloseModal(){
    if (this._activeModal) 
			this._activeModal.close();
  }

  confirmSelected(){
    this.changeCurrency.emit(this.currentCurrency);
    this.clickCloseModal();
  }
}