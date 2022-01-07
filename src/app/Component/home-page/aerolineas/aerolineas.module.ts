import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AerolineasComponent } from './aerolineas.component';
import { AerolineasService } from './services/aerolineas.service';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';



@NgModule({
  declarations: [
    AerolineasComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    PipesModule
  ],
  providers:[
    AerolineasService
  ]
})
export class AerolineasModule { }
