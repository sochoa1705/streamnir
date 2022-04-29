import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { ICardAutocomplete } from './card-autocomplete.interface';
// import { MockedCardAutocomplete } from './card-autocomplete.mocked';

@Component({
  selector: 'app-card-autocomplete',
  templateUrl: './card-autocomplete.component.html',
  styleUrls: ['./card-autocomplete.component.scss'],
})
export class CardAutocompleteComponent implements OnChanges {
  @Input() cardAutocomplete: Array<ICardAutocomplete> ;
  @Input() boxOrigen: boolean = false;
  @Input() inputText: string
  @Output() itmSelected = new EventEmitter<ICardAutocomplete>()
  str: any
  lista: any[] = []

  ngOnChanges(){
    this.cardAutocomplete.map((pnt: ICardAutocomplete) => {
      let title = pnt.title.toLowerCase()
      this.inputText = this.inputText.toLowerCase()
      if(title.includes(this.inputText)){
          this.str = title.replace(this.inputText, `<span style="color:red">${this.inputText}</span>`)
          pnt.texto = this.str
      } else {
        pnt.texto = pnt.title
      }
      return pnt
    })
  }
  selectItm(itm: ICardAutocomplete) {    
    this.itmSelected.emit(itm)
  }

}