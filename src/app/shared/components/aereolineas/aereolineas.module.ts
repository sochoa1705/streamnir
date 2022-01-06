import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AereolineasComponent } from './aereolineas.component';
import { PorSlidePipe } from './pipe/porslide.pipe';
import { DirectivesModule } from '../../directives/directives.module';



@NgModule({
  declarations: [
    AereolineasComponent,
    PorSlidePipe
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports:[
    AereolineasComponent
  ]
})
export class AereolineasModule { }
