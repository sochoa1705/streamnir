import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Public/login/login.component';

const routes: Routes = [
  // { path: 'login',    component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () =>
    import('./Component/home-page/home-page.module').then(
      (m) => m.HomePageModule
    )
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
