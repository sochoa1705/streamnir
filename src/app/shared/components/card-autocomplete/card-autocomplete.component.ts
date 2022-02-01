import { Component, Input } from '@angular/core';
import { ICardAutocomplete } from './card-autocomplete.interface';

@Component({
  selector: 'app-card-autocomplete',
  templateUrl: './card-autocomplete.component.html',
  styleUrls: ['./card-autocomplete.component.scss'],
})
export class CardAutocompleteComponent {
    @Input() cardAutocomplete: Array<ICardAutocomplete> = [];
    @Input() boxOrigen: boolean = false;
}