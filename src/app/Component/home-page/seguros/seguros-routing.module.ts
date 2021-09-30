import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansComponent } from './commons/components/plans/plans.component';
import { SlideComponent } from './commons/components/slide/slide.component';
import { SegurosComponent } from './seguros.component';

const routes: Routes = [
  {path: '', component: SegurosComponent,
  children:[
    {path: '', component: SlideComponent},
    {path: 'slide', component: SlideComponent},
    {path: 'planes', component: PlansComponent}

  ]},


]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegurosRoutingModule { }
