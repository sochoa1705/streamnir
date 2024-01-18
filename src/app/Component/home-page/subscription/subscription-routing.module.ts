import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';
import { FormComponent } from './form/form.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
	{
		path: '',
		component: SubscriptionComponent,
		children: [
			{ path: '', component: FormComponent },
			{ path: 'exito', component: SuccessComponent }
		]
	},
	{ path: '**', redirectTo: '/404' }
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class SubscriptionRoutingModule {
}