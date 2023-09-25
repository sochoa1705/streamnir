import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { Params } from 'src/app/api/api-nmviajes/models/ce-metasearch';
import { SearchFiltersService } from 'src/app/api/api-nmviajes/services/search-filters.service';

@Component({
	selector: 'app-input-passengers',
	templateUrl: './input-passengers.component.html',
	styleUrls: ['./input-passengers.component.scss']
})
export class InputPassengersComponent implements OnInit {
	constructor(private _notification: NotificationService,private _searchFiltersService: SearchFiltersService) {
		this._searchFiltersService.isSetParams.subscribe({
			next: (res:Params) => {
				this.totalADT = res.adults;
				this.totalINF = res.infants;
				this.totalCNN = res.children;
				this.totalPassengers = res.children + res.adults;
				this.totalPassengersTemp = res.children + res.adults + res.infants;
				this.totalADTTemp = res.adults;
				this.totalINFTemp = res.infants;
				this.totalCNNTemp = res.children;
			}
		}); 
	}
	showOptions = false;
	totalADT = 1;
	totalINF = 0;
	totalCNN = 0;
	totalPassengers = 1;
  	totalPassengersTemp = 1;
  	totalADTTemp = 1;
	totalINFTemp = 0;
	totalCNNTemp = 0;

	ngOnInit(): void {}

	clickCounter(type: number, isPlus: boolean) {
		let currentPassengers = this.totalPassengersTemp - this.totalINF;
		currentPassengers = isPlus ? currentPassengers + 1 : currentPassengers - 1;
	
		if (currentPassengers > 9 && type!==2) 
			this._notification.showNotificacion("Límite de pasajeros excedido", "Lo siento, no puedes seleccionar más de 9 pasajeros");

		if (currentPassengers <= 9 || type==2) {
			switch (type) {
				case 0:
					const totalADT = isPlus ? this.totalADT + 1 : this.totalADT - 1;
					if (totalADT <= 0) this._notification.showNotificacion("Mínimo de adultos", "Debe viajar al menos un adulto");
					else if (this.totalINF > totalADT) this._notification.showNotificacion("Límite de infantes excedido", "Asegúrate de que la cantidad de adultos sea igual o mayor que la cantidad de infantes.");
					else this.totalADT = totalADT;
					break;
				case 1:
					this.totalCNN = isPlus ? this.totalCNN + 1 : this.totalCNN == 0 ? 0 : this.totalCNN - 1;
					break;
				default:
					const totalINF = isPlus ? this.totalINF + 1 : this.totalINF == 0 ? 0 : this.totalINF - 1;
					if (totalINF > this.totalADT) this._notification.showNotificacion("Límite de infantes excedido", "Asegúrate de que la cantidad de adultos sea igual o mayor que la cantidad de infantes."); 
					else this.totalINF = totalINF;
					break;
			}
			this.totalPassengersTemp = this.totalADT + this.totalINF + this.totalCNN;
		}
	}

  updateTotal(){
    this.totalPassengers=this.totalPassengersTemp - this.totalINF;
    this.totalADTTemp = this.totalADT;
    this.totalCNNTemp = this.totalCNN;
    this.totalINFTemp = this.totalINF;
    this.showOptions=false;
  }

  resetTotal(){
    this.showOptions=false;
    this.totalADT=this.totalADTTemp;
    this.totalCNN=this.totalCNNTemp;
    this.totalINF=this.totalINFTemp;
  }

  getValues(){
	 return {
		adults: this.totalADT,
		children: this.totalCNN,
		infants:  this.totalINF
	 }
  }

}
