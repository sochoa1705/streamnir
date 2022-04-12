import { Component, OnInit } from '@angular/core';
import { toUp } from '../../../shared/utils';

@Component({
  selector: 'app-nuestras-agencias',
  templateUrl: './nuestras-agencias.component.html',
  styleUrls: ['./nuestras-agencias.component.scss']
})
export class NuestrasAgenciasComponent implements OnInit {
  agencias = [
    {
      id: 1,
      direccion: 'Av. 28 de Julio 1136 -',
      distrito: 'Miraflores',
      horario: 'Lun - Vie 10:00 am a 07:00 pm',
      correo: 'vacaciones@nmviajes.com',
    },
    {
      id: 2,
      direccion: 'Av. José Pardo 801 -',
      distrito: 'Miraflores',
      horario: 'Lun - Vie 10:00 am a 07:00 pm',
      horario2: 'Sab 10:.. am - 2:00 pm',
      correo: 'vacaciones@nmviajes.com',
    },
    {
      id: 3,
      direccion: 'Av. Primavera 1352 -',
      distrito: 'Monterrico - Surco',
      horario: 'Lun - Vie 10:00 am a 07:00 pm',
      horario2: 'Sab 10:00 am - 2:00 pm',
      correo: 'reservasprimavera@nmviajesexpress.com',
      telefono: '745-7638',
      telefono2: '745-7639',
    }
  ]

  distrito: string
  direccion: string
  direccion2: string
  horario: string
  horario2: string
  correo: string
  telefono: string
  telefono2: string
  btnActivo: number
  map: number
  constructor() {
    this.agenciaView(1)
  }
  ngOnInit(): void {
    toUp()
  }
  agenciaView(id: number) {
    this.agencias.filter((agencia: any) => {
      const agenciaId = agencia.id
      if (agenciaId === id) {
        this.btnActivo = agencia.id
        this.distrito = agencia.distrito
        this.direccion = agencia.direccion
        this.direccion2 = agencia.direccion2
        this.horario = agencia.horario
        this.horario2 = agencia.horario2
        this.correo = agencia.correo
        this.telefono = agencia.telefono
        this.telefono2 = agencia.telefono2
        this.map = agencia.id
      }
    })
  }

}
