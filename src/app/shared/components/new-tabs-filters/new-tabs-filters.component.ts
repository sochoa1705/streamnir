import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { dataTabs } from './data';

@Component({
  selector: 'app-new-tabs-filters',
  templateUrl: './new-tabs-filters.component.html',
  styleUrls: ['./new-tabs-filters.component.scss']
})
export class NewTabsFiltersComponent implements OnInit {
  @Output() clickedTab=new EventEmitter();
  constructor() { }
  dataTabs=dataTabs;
  indexActive=0;
  indexHover=-1;
  ngOnInit(): void {
  }
  clickTab(index:number){
      this.indexActive=index;
      this.clickedTab.emit(index);
  }

}
