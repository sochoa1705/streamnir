import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputAutocompleteComponent } from './input-autocomplete.component';
import { CardAutocompleteModule } from '../card-autocomplete/card-autocomplete.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InputAutocompleteComponent
  ],
  imports: [
    CommonModule,
    CardAutocompleteModule,
    FormsModule
  ],
  exports:[InputAutocompleteComponent]
})
export class InputAutocompleteModule { }
