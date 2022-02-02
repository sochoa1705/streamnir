import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ICardAutocomplete } from './card-autocomplete.interface';
import { MockedCardAutocomplete } from './card-autocomplete.mocked';

@Component({
  selector: 'app-card-autocomplete',
  templateUrl: './card-autocomplete.component.html',
  styleUrls: ['./card-autocomplete.component.scss'],
})
export class CardAutocompleteComponent {
    @Input() cardAutocomplete: Array<ICardAutocomplete> = MockedCardAutocomplete;
    @Input() boxOrigen: boolean = false;

    @Output() itmSelected = new EventEmitter<ICardAutocomplete>()


    selectItm(itm:ICardAutocomplete){
      this.itmSelected.emit(itm)
    }

}