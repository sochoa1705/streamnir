import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AereolineasComponent } from './aereolineas.component';
import { PorSlidePipe } from './pipe/porslide.pipe';



@NgModule({
  declarations: [
    AereolineasComponent,
    PorSlidePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AereolineasComponent
  ]
})
export class AereolineasModule { }
