import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { HttpClientModule } from '@angular/common/http';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    FooterModule,
    MatCheckboxModule,
    MatRadioModule,
    HttpClientModule
  ],
  exports: [PerfilComponent],
  providers: [DataPagePresenterService]

})
export class PerfilModule { }
