import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

interface Item {
	value: any;
	name: string;
  active:boolean;
  total:number;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Input() dataAirlines:Item[]=[];
  @Input() dataScaleFilter:Item[]=[];
  @Input() dataBagFilter:Item[]=[];
  @Input() totalResults=0;
  @Input() totalResultsFilter=0;
  @Input() exchangeRate=0;
  @Output() changeArrayFilters=new EventEmitter();
  @Output() updateArrayAirlinesFilter=new EventEmitter();
  @Output() changeExchangeRate=new EventEmitter();
  formGroup: FormGroup;

  formObject = {
		currency: new FormControl('0'),
	};

  
  constructor() { 
    this.formGroup = new FormGroup(this.formObject);
  }


  ngOnInit(): void {
  }

  clickedOption($event:Item, type:string){
      switch (type) {
        case 'typeBag':
          this.changeArrayFilters.emit({key:'typeBag',item:$event })
          break;
        case 'scales':
            this.changeArrayFilters.emit({key:$event.value,item:$event })
            break;
        default://default es filtro aerolineas
        this.changeArrayFilters.emit({key:$event.value=='MT' ? 'multiticket' : 'airlineCodeFilter',item:$event })
        break;
      }
  }

  seletedItemCurrency($event:string){
     this.changeExchangeRate.emit($event);
  }

  selectedAirlines($event:string[]){
    this.updateArrayAirlinesFilter.emit($event)
  }

  get currencyField(): AbstractControl {
		return this.formGroup.get('currency')!;
	}

}
