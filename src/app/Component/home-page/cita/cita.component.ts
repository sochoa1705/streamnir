import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Renombrando valores para SEO - Inicio
    document.getElementsByTagName("title")[0].innerHTML = environment.SEO.scheduleYourAppointment.title;

    let description = document.getElementsByName('description')[0];
    description.setAttribute("content", environment.SEO.scheduleYourAppointment.description);
    // Renombrando valores para SEO - Fin
  }

}
