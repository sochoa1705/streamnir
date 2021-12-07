import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminosCondicionesComponent } from 'src/app/Component/home-page/terminos-condiciones/terminos-condiciones.component';

@NgModule({
  declarations: [
    TerminosCondicionesComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TerminosCondicionesComponent,
  ],
})
export class TerminosCondicionesModule { }
