import { Component, Input, OnInit } from '@angular/core';
import { GlobalComponent } from '../../global';

@Component({
  selector: 'app-input-class',
  templateUrl: './input-class.component.html',
  styleUrls: ['./input-class.component.scss']
})
export class InputClassComponent implements OnInit {
  @Input() isLeft=false;
  @Input() includeFirtClass=true;
  @Input() isSearchFlight=false;
  constructor() {}
  showOptions=false;
  nameClass='Económica'
  indexClass=0;
  inside=false;
  counterClik=0;
  ngOnInit(): void {
    if(window.location.href.includes('resultados')){
      this.indexClass=GlobalComponent.searchData.flightClass;
      this.nameClass=this.indexClass==0 ? 'Económica' : this.indexClass==1 ? 'Business':'Primera clase';
    }
  }
  // TODO: correos

  clickOption(nameClass:string, index:number){
    this.nameClass=nameClass;
    this.indexClass=index;
    this.showOptions=false;
  }

  clickInside(){
    this.showOptions=!this.showOptions;
    this.counterClik++;
  }

  /*@HostListener("document:click")
  clickedOut() 
    if(this.inside && this.counterClik > 1) this.showOptions=false;
  }*/

  getValues(){
    return {
      flightClass: this.indexClass,
    }
  }

}
