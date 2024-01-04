import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildYourTripComponent } from './build-your-trip.component';

const routes: Routes = [
  {
    path: '',
    component: BuildYourTripComponent,
    children: [
      { path: '', component: BuildYourTripComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildYourTripRoutingModule { }
