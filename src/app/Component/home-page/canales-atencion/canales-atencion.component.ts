import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-canales-atencion',
  templateUrl: './canales-atencion.component.html',
  styleUrls: ['./canales-atencion.component.scss']
})
export class CanalesAtencionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    debugger

    // Renombrando valores para SEO - Inicio
    document.getElementsByTagName("title")[0].innerHTML = environment.SEO.careChannels.title;

    let description = document.getElementsByName('description')[0];
    description.setAttribute("content", environment.SEO.careChannels.description);
    // Renombrando valores para SEO - Fin
  }

}
