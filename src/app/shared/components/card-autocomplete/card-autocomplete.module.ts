import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardAutocompleteComponent } from './card-autocomplete.component';

@NgModule({
  declarations: [CardAutocompleteComponent],
  imports: [CommonModule, RouterModule],
  exports: [CardAutocompleteComponent],
})
export class CardAutocompleteModule {}