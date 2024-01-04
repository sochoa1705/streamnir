import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardAutocompleteComponent } from './card-autocomplete.component';
import { sanitizeHtmlPipe } from './pipe/html.pipe';

@NgModule({
  declarations: [CardAutocompleteComponent, sanitizeHtmlPipe],
  imports: [CommonModule, RouterModule],
  exports: [CardAutocompleteComponent, sanitizeHtmlPipe],
})
export class CardAutocompleteModule {}