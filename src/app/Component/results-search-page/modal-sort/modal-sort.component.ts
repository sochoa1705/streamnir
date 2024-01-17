import { Component, Input, OnInit, Optional } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
interface Order {
	price: number;
	duration: number;
}
@Component({
  selector: 'app-modal-sort',
  templateUrl: './modal-sort.component.html',
  styleUrls: ['../modal-currency/modal-currency.component.scss']
})
export class ModalSortComponent implements OnInit {

  constructor(@Optional() private _activeModal?: NgbActiveModal) { }
  @Input() theCheapest:Order | null; 
  @Input() betterOption:Order | null; 
  @Input() shorterDuration:Order | null; 
  @Input() currency:string = 'USD';
  
  listSort=[
    {
      value: 1,
      name: 'Mejor Opción',
      checked:false,
    },
    {
      value: 0,
      name: 'Precio más bajo',
      checked:false,
    },
    {
      value: 2,
      name: 'Más rápido',
      checked:false,
    }
  ]

  ngOnInit(): void {
      this.listSort.forEach(item=>{
        
      })
  }

  clickOption(value:number, index:number){

  }

  clickCloseModal(){
    if (this._activeModal) {
			this._activeModal.close();
		}
  }

}
