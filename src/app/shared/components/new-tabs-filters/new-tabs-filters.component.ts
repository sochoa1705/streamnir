import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { dataTabs } from './data';

@Component({
  selector: 'app-new-tabs-filters',
  templateUrl: './new-tabs-filters.component.html',
  styleUrls: ['./new-tabs-filters.component.scss']
})
export class NewTabsFiltersComponent implements OnInit {
  @Input() indexSelectedTab=0;
  @Output() clickedTab=new EventEmitter();
  constructor() { }
  dataTabs=dataTabs;
  indexActive=0;
  indexHover=-1;
  ngOnInit(): void {
     this.indexActive=this.indexSelectedTab;
  }
  clickTab(index:number){
      this.indexActive=index;
      this.clickedTab.emit(index);
  }

}
