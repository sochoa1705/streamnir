import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
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
	constructor(@Optional() private _activeModal?: NgbActiveModal) {}
	@Input() theCheapest: Order | null;
	@Input() betterOption: Order | null;
	@Input() shorterDuration: Order | null;
	@Input() currentIndexTab = 0;
	@Input() currency: string = 'USD';

	@Output() clickTabSort = new EventEmitter();

	indexTabSelected = 0;

	listSort = [
		{
			value: 1,
			name: 'Mejor Opción',
			checked: false
		},
		{
			value: 0,
			name: 'Precio más bajo',
			checked: false
		},
		{
			value: 2,
			name: 'Más rápido',
			checked: false
		}
	];

	ngOnInit(): void {
		this.listSort.forEach((item) => {
			if (item.value == this.currentIndexTab) item.checked = true;
			this.indexTabSelected = this.currentIndexTab;
		});
	}

	clickOption(value: number, index: number) {
		this.listSort.forEach((item) => {
			item.checked = item.value == value ? true : false;
			this.indexTabSelected = value;
		});
	}

	applyFilter() {
		this.clickCloseModal();
		this.clickTabSort.emit(this.indexTabSelected);
	}

	clickCloseModal() {
		if (this._activeModal) {
			this._activeModal.close();
		}
	}
}
