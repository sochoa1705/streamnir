import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-modal-boletin',
	templateUrl: './modal-boletin.component.html',
	styleUrls: ['./modal-boletin.component.scss']
})
export class ModalBoletinComponent implements OnInit {
	constructor(public activeModal: NgbActiveModal) {}
	arrayChecks = 
    [{
			isCheked: false,
			text: 'Al suscribirte estás aceptando nuestros Términos y condiciones y la Política de protección de datos'
		},
		{
			isCheked: false,
			text: 'Autorizo el uso de mi información para recibir publicidad de la empresa.'
		}];
	ngOnInit(): void {
     this.arrayChecks.forEach(item=>{
        item.isCheked=false;
     })
  }

  checked(index:number){
    this.arrayChecks[index].isCheked=!this.arrayChecks[index].isCheked;
  }
}
