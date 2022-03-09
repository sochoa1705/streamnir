import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home-page/home/home.component';
import { ActivityComponent } from './Component/home-page/vuelos/commons/components/destinos/activity/activity.component';
import { HotelsComponent } from './Component/home-page/vuelos/commons/components/destinos/hotels/hotels.component';

const routes: Routes = [
  // { path: 'login',    component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./Component/home-page/home-page.module').then(
        (m) => m.HomePageModule
      )
  },
  { path: 'hoteles', component: HotelsComponent },
  { path: 'tickets', component: ActivityComponent },
  { path: '**', component: HomeComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
