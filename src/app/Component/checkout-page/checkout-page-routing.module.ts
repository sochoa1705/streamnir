import { RouterModule, Routes } from '@angular/router';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CheckoutPageComponent } from './checkout-page.component';
import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeEs, "es");
export const routes: Routes = [{ path: '', component: CheckoutPageComponent}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [{ provide: LOCALE_ID, useValue: "es" }],
})
export class CheckoutPageRoutingModule { }