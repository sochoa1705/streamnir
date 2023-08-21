import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Item {
	value: any;
	name: string;
  active:boolean;
}
@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {

  constructor() { }
  dropdownActive=false;
  @Input() title='';
  @Input() listOptions:Item[]=[];
  @Output() clickedOption=new EventEmitter();
  ngOnInit(): void {
  }

  clickOption(item:Item){
    this.clickedOption.emit(item)
  }

}
