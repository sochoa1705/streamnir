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
export const routes: Routes = [{ path: '', component: ResultsSearchPageComponent}]
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
        DropdownFilterModule
    ],
    declarations:[ResultsSearchPageComponent, FiltersComponent],
    exports: [ResultsSearchPageComponent],
    providers: [{ provide: LOCALE_ID, useValue: "es" }],
})
export class ResultsSearchPageModule { }
