import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesComponent } from '../packages/packages.component';
import { PaquetesComponent } from './paquetes.component';

const routes: Routes = [
  {
    path: '',
    component: PaquetesComponent,
    children: [
      { path: '', component: PackagesComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaquetesRoutingModule { }
