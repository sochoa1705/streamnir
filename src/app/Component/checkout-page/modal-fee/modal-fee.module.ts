import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { ModalFeeComponent } from './modal-fee.component';
import { SwiperModule } from 'swiper/angular';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

@NgModule({
  declarations: [
    ModalFeeComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    ButtonModule
  ],
  exports:[ModalFeeComponent],
  entryComponents: [
    ModalFeeComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class  ModalFeeModule { }