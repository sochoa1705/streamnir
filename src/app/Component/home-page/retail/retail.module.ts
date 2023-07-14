import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetailComponent } from './retail.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    RetailComponent,
    CarouselComponent
  ],
	imports: [
		CommonModule,
		NgbCarouselModule
	]
})
export class RetailModule { }
