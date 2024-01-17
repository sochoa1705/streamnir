import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
interface IOption{
  value:number,
  nameOption:string,
  nameSeleted:string,
  subNameSeled:string
}

interface Order {
	price: number;
	duration: number;
}

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit {

  constructor() { }
  indexTabSelect = 0;
  selectedOptionFilter = -1;
  showMoreOptions=false;
  textOptionSeleted='Más opciones';
  textOptionSortBy='';

  @Input() theCheapest:Order | null; 
  @Input() betterOption:Order | null; 
  @Input() shorterDuration:Order | null; 
  @Input() currency:string = 'USD';
  @Input() arrayMoreOptionsSort:IOption[] = [];
  @Output() clickTabSort= new EventEmitter();

  ngOnInit(): void {
  }

  clickOptionSelect(item:IOption){
    this.showMoreOptions=false;
    this.indexTabSelect=3;
    this.selectedOptionFilter=item.value;
    this.textOptionSeleted=item.nameSeleted;
    this.textOptionSortBy=item.subNameSeled;
    this.clickTabSort.emit(item.value);
  }

  clickTab(index:number){
    this.indexTabSelect=index;
    this.showMoreOptions=false;
    this.selectedOptionFilter = -1;
    this.textOptionSeleted='Más opciones';
    this.textOptionSortBy='';
    this.clickTabSort.emit(index);
  }

  resetSort(){
    this.indexTabSelect=0;
    this.showMoreOptions=false;
    this.selectedOptionFilter = -1;
    this.textOptionSeleted='Más opciones';
    this.textOptionSortBy='';
  }

}
