import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetailComponent } from './retail.component';
import { NgbCarouselModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { BenefitsComponent } from './benefits/benefits.component';

@NgModule({
  declarations: [
    RetailComponent,
    CarouselComponent,
    BenefitsComponent
  ],
	imports: [
		CommonModule,
		NgbCarouselModule,
		NgbCollapseModule
	]
})
export class RetailModule { }
