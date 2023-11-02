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
import { PreferenciasComponent } from './preferencias/preferencias.component';
import { RouterModule } from '@angular/router';
import { MyProfyleComponent } from './my-profyle/my-profyle.component';
import { MisReservasVuelosComponent } from './mis-reservas-vuelos/mis-reservas-vuelos.component';
import { DetalleBookingComponent } from './modal/detalle-booking/detalle-booking.component';
import { SegmentoComponent } from './modal/segmento/segmento.component';
import { MisReservasSegurosComponent } from './mis-reservas-seguros/mis-reservas-seguros.component';
import { DetalleSecureComponent } from './modal/detalle-secure/detalle-secure.component';

@NgModule({
  declarations: [PerfilComponent, ContactoComponent, PassengerComponent, PasswordComponent, PreferenciasComponent, MyProfyleComponent, MisReservasVuelosComponent, MisReservasSegurosComponent, DetalleBookingComponent,
    DetalleSecureComponent, SegmentoComponent],
  imports: [
    CommonModule,
    RouterModule,
    PerfilRoutingModule,
    FooterModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FileModule,

  ],
	exports: [ PerfilComponent, PreferenciasComponent, PassengerComponent ],
  providers: [DataPagePresenterService, PreferenceService, ContactoService, PassengersService, PasswordService]

})
export class PerfilModule { }
