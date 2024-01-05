import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { ResultsSearchPageComponent } from './results-search-page.component';
import { RouterModule, Routes } from '@angular/router';
import localeEs from "@angular/common/locales/es";
import { CommonModule, registerLocaleData } from "@angular/common";
import { FilterTabsModule } from 'src/app/shared/components/filter-tabs/filter-tabs.module';
import { CardResultSearchModule } from 'src/app/shared/components/card-result-search/card-result-search.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SelectModule } from 'src/app/shared/components/select/select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from './filters/filters.component';
import { DropdownFilterModule } from 'src/app/shared/components/dropdown-filter/dropdown-filter.module';
import { NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SortByComponent } from './sort-by/sort-by.component';
import { PriceFilterModule } from 'src/app/shared/components/price-filter/price-filter.module';
import { DurationFilterModule } from 'src/app/shared/components/duration-filter/duration-filter.module';
import { NotResultsComponent } from './not-results/not-results.component';
import { CardLoaderResultModule } from 'src/app/shared/components/card-loader-result/card-loader-result.module';
import { IdlePopupComponent } from './idle-popup/idle-popup.component';
import { ModalSearchComponent } from './modal-search/modal-search.component';
import { ModalCurrencyComponent } from './modal-currency/modal-currency.component';
import { ModalSortComponent } from './modal-sort/modal-sort.component';
export const routes: Routes = [{ path: '', component: ResultsSearchPageComponent}];
registerLocaleData(localeEs, "es");

@NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports: [
        RouterModule.forChild(routes), 
        CommonModule,
        FilterTabsModule,
        CardResultSearchModule,
        ButtonModule,
        SelectModule,
        ReactiveFormsModule, 
        FormsModule,
        DropdownFilterModule,
        NgbPopoverModule,
        NgbTooltipModule,
        PriceFilterModule,
        DurationFilterModule,
        CardLoaderResultModule
    ],
    declarations:[
        ResultsSearchPageComponent, 
        FiltersComponent, 
        SortByComponent, 
        NotResultsComponent, 
        IdlePopupComponent, 
        ModalSearchComponent,
        ModalCurrencyComponent, 
        ModalSortComponent
    ],
    exports: [ResultsSearchPageComponent],
    providers: [{ provide: LOCALE_ID, useValue: "es" }],
})
export class ResultsSearchPageModule { }
