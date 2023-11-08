import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit,OnChanges {

  constructor() { }
  @Input() isDisabled=false
  @Input() title='Tarjeta de crédito o débito'
  @Input() type='card'
  @Input() icon=''
  @Input() showDropdown=false
  @Output() clickTab=new EventEmitter()

  ngOnChanges(changes: SimpleChanges){
    if(changes["isDisabled"] && changes["isDisabled"].currentValue){
      if(this.isDisabled) this.showDropdown=false
    }
  }
  ngOnInit(): void {
  }

  clickAcordeon(){
    if(!this.isDisabled){
      this.clickTab.emit(this.showDropdown)
    }
  }

}
