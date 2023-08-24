import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  @Input() totalPaginate=0;
  @Output() changeArrayFilters=new EventEmitter();
  formGroup: FormGroup;

  formObject = {
		currency: new FormControl(''),
	};

  
  constructor() { this.formGroup = new FormGroup(this.formObject);}


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
        default:
        this.changeArrayFilters.emit({key:$event.value=='MT' ? 'airline.code' : 'airlineCodeFilter',item:$event })
        break;
      }
  }

}
