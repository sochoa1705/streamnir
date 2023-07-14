import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanalesAtencionComponent } from './canales-atencion.component';

const routes: Routes = [
  {
    path: '',
    component: CanalesAtencionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanalesAtencionRoutingModule { }
