import { NgModule } from '@angular/core';
import { NewcardOfferComponent } from './newcard-offer.component';
import { CommonModule } from '@angular/common';
import { ReplacePipe } from '../../pipes/replace.pipe';

@NgModule({
    imports: [CommonModule],
    exports: [NewcardOfferComponent],
    declarations: [
    NewcardOfferComponent,ReplacePipe
  ],
    providers: [],
})
export class NewCardOfferModule { }
