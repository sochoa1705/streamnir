import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputAutocompleteComponent } from './input-autocomplete.component';
import { CardAutocompleteModule } from '../card-autocomplete/card-autocomplete.module';



@NgModule({
  declarations: [
    InputAutocompleteComponent
  ],
  imports: [
    CommonModule,
    CardAutocompleteModule
  ],
  exports:[InputAutocompleteComponent]
})
export class InputAutocompleteModule { }
