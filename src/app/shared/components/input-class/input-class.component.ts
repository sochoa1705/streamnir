import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-class',
  templateUrl: './input-class.component.html',
  styleUrls: ['./input-class.component.scss']
})
export class InputClassComponent implements OnInit {

  constructor() { }
  showOptions=false;
  nameClass='Económico'
  indexClass=0;
  inside=false;
  counterClik=0;
  ngOnInit(): void {
  }

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
  clickedOut() {
    if(this.inside && this.counterClik > 1) this.showOptions=false;
  }*/

}
