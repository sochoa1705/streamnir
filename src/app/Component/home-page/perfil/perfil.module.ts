import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { HttpClientModule } from '@angular/common/http';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreferenceService } from '../../../Services/preference/preference.service';
@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    FooterModule,
    MatCheckboxModule,
    MatRadioModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [PerfilComponent],
  providers: [DataPagePresenterService, PreferenceService]

})
export class PerfilModule { }
