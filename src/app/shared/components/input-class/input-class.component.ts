import { Component, Input, OnInit } from '@angular/core';
import { Params } from 'src/app/api/api-nmviajes/models/ce-metasearch';
import { SearchFiltersService } from 'src/app/api/api-nmviajes/services/search-filters.service';

@Component({
  selector: 'app-input-class',
  templateUrl: './input-class.component.html',
  styleUrls: ['./input-class.component.scss']
})
export class InputClassComponent implements OnInit {
  @Input() isLeft=false;
  @Input() includeFirtClass=true;
  constructor(private _searchFiltersService: SearchFiltersService) {
		this._searchFiltersService.isSetParams.subscribe({
			next: (res:Params) => {
        this.indexClass=res.flightClass;
        this.nameClass=this.indexClass==0 ? 'Económica' : this.indexClass==1 ? 'Negocios':'Primera clase';
			}
		}); 
  }
  showOptions=false;
  nameClass='Económica'
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

  getValues(){
    return {
      flightClass: this.indexClass,
    }
   }

}
