import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss'],
})
export class PriceFilterComponent implements OnInit {
  constructor() { }
  @Input() currency='USD';
  @Input() minPrice=0;
  @Input() maxPrice=100;
  @Output() resetPrice=new EventEmitter(); 
  @Output() filterPriceRange=new EventEmitter(); 

  dropdownActive=true;
  value: number = 0;
  highValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
  };


  
  ngOnInit(): void {
  }

  filterPrice($event:any){
      console.log($event,'event')
      this.filterPriceRange.emit($event);
  }

  resetFilter(){
    this.value=0;
    this.resetPrice.emit();
  }

}
