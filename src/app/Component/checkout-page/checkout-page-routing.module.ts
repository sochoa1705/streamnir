import { RouterModule, Routes } from '@angular/router';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CheckoutPageComponent } from './checkout-page.component';
import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
import { DeactivateGuard } from 'src/app/Guards/passenger.guard';
import { DeactivatePaymentGuard } from 'src/app/Guards/payment.guard';
import { CanActivateCheckoutGuard } from 'src/app/Guards/checkout.guard';

registerLocaleData(localeEs, "es");
export const routes: Routes = [
    { path: '', 
        component: CheckoutPageComponent,
        children: [
            {
				path: '',
				loadChildren: () => import('./baggage-insurance/baggage-insurance.module').then((m) => m.BaggageAndInsuranceModule)
			},
            {
				path: 'pasajeros',
				loadChildren: () => import('./passengers/passengers.module').then((m) => m.PassengersModule),
                canActivate:[CanActivateCheckoutGuard],
                canDeactivate: [DeactivateGuard]
			},
            {
				path: 'pago',
				loadChildren: () => import('./pay/pay.module').then((m) => m.PayModule),
                canActivate:[CanActivateCheckoutGuard],
                canDeactivate:[DeactivatePaymentGuard]
			}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [{ provide: LOCALE_ID, useValue: "es" }],
})
export class CheckoutPageRoutingModule { }
