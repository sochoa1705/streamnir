import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from '../Component/home-page/vuelos/commons/components/destinos/activity/activity.component';
import { HotelsComponent } from '../Component/home-page/vuelos/commons/components/destinos/hotels/hotels.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'actividades/ciudad/:city/sitio/:site/vuelos/:isflight', component: ActivityComponent },
      { path: 'hoteles/ciudad/:city/sitio/:site/vuelos/:isflight', component: HotelsComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule { }
