import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AerolineasComponent } from './aerolineas.component';
import { AerolineasService } from './services/aerolineas.service';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { AereolineasModule } from 'src/app/shared/components/aereolineas/aereolineas.module';
import { GalleriaModule } from 'primeng/galleria';



@NgModule({
  declarations: [
    AerolineasComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    GalleriaModule,
    AereolineasModule,
    PipesModule
  ],
  providers: [
    AerolineasService
  ]
})
export class AerolineasModule { }
