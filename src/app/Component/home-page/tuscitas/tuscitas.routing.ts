import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TuscitasComponent } from './tuscitas.component';


const routes: Routes = [
  {
    path: '',
    component: TuscitasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TusCitasRoutingModule { }
