import { Component, Input, OnInit, Optional } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
interface Order {
	price: number;
	duration: number;
}
@Component({
  selector: 'app-modal-sort',
  templateUrl: './modal-sort.component.html',
  styleUrls: ['./modal-sort.component.scss']
})
export class ModalSortComponent implements OnInit {

  constructor(@Optional() private _activeModal?: NgbActiveModal) { }
  @Input() theCheapest:Order | null; 
  @Input() betterOption:Order | null; 
  @Input() shorterDuration:Order | null; 
  @Input() currency:string = 'USD';
  
  listSort=[
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
  }

  clickOption(){

  }

  clickCloseModal(){
    if (this._activeModal) {
			this._activeModal.close();
		}
  }

}
