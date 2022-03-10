import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { HttpClientModule } from '@angular/common/http';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreferenceService } from '../../../Services/preference/preference.service';
import { ContactoComponent } from './contacto/contacto.component';
import { ContactoService } from './contacto/contacto.service';
import { MatIconModule } from '@angular/material/icon';
import { PassengerComponent } from './passenger/passenger.component';
import { FileModule } from 'src/app/shared/components/file/file.module';
import { PasswordComponent } from './password/password.component';
import { PassengersService } from './passenger/passengers.service';
import { PasswordService } from './password/password.service';

@NgModule({
  declarations: [PerfilComponent, ContactoComponent, PassengerComponent, PasswordComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    FooterModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FileModule
  ],
  exports: [PerfilComponent],
  providers: [DataPagePresenterService, PreferenceService, ContactoService, PassengersService, PasswordService]

})
export class PerfilModule { }
