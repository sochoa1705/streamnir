import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home-page/home/home.component';
import { ActivityComponent } from './Component/home-page/vuelos/commons/components/destinos/activity/activity.component';
import { HotelsComponent } from './Component/home-page/vuelos/commons/components/destinos/hotels/hotels.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./Component/home-page/home-page.module').then(m => m.HomePageModule)
  },
  { path: 'hoteles/ciudad/:city/sitio/:site/vuelos/:isflight', component: HotelsComponent },
  { path: 'actividades/ciudad/:city/sitio/:site/vuelos/:isflight', component: ActivityComponent },
  { path: '**', component: HomeComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
