import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsPlusHotelComponent } from './flights-plus-hotel.component';

const routes: Routes = [
  {
    path: '',
    component: FlightsPlusHotelComponent,
    children: [
      { path: '', component: FlightsPlusHotelComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightsPlusHotelRoutingModule { }
