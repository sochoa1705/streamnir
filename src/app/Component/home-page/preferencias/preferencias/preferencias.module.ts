import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferenciasComponent } from './preferencias.component';
import { PerfilModule } from '../../perfil/perfil.module';
import { PerfilRoutingModule } from './preferencias.routing.module';



@NgModule({
  declarations: [PreferenciasComponent],
  imports: [
    CommonModule,
    PerfilModule,
    PerfilRoutingModule
  ]
})
export class PreferenciasModule { }
