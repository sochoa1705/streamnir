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
      imagen: './assets/agencias/agencia_.png'
    },
    {
      id: 2,
      direccion: 'Av. José Pardo 801 -',
      distrito: 'Miraflores',
      horario: 'Lun - Vie 10:00 am a 07:00 pm',
      horario2: 'Sab 10:00 am - 6:00 pm',
      correo: 'vacaciones@nmviajes.com',
      imagen: './assets/agencias/Pardo.png'
    },
    {
      id: 3,
      direccion: 'Av. Primavera 1352 -',
      distrito: 'Monterrico - Surco',
      horario: 'Lun - Vie 09:00 am a 07:00 pm',
      horario2: 'Sab 10:00 am - 1:00 pm',
      correo: 'primavera@nmviajes.com',
      telefono: '745-7638',
      telefono2: '745-7639',
      imagen: './assets/agencias/Primavera.png'
    },
    {
      id: 4,
      direccion: 'Av. Caminos del Inca 257 tienda 215 -',
      distrito: 'Chacarilla, Surco',
      horario: 'Lun - Vie 10:00 am a 07:00 pm',
      horario2: 'Sab 10:00 am - 1:00 pm',
      correo: 'caminosdelinca@nmviajes.com',
      telefono: '',
      telefono2: '',
      imagen: './assets/agencias/CaminosDelInca.png'
    },
    {
      id: 5,
      direccion: 'Av. Javier Prado Este 5268 tienda 213 –',
      distrito: 'La Molina',
      horario: 'Lun - Vie 10:00 am a 07:00 pm',
      horario2: 'Sab 10:00 am - 1:00 pm',
      correo: 'fontana@nmviajes.com',
      telefono: '782-4812',
      telefono2: '',
      imagen: './assets/agencias/LaFontana.png'
    },
    {
      id: 6,
      direccion: 'Av. Alfredo Mendiola 25017 –',
      distrito: 'Independencia',
      horario: 'Lun - Dom 10:00 am a 10:00 pm',
      horario2: '',
      correo: 'vacaciones@nmviajes.com',
      telefono: '',
      telefono2: '',
      imagen: './assets/agencias/MegaPlaza.png'
    },
    {
      id: 7,
      direccion: 'Av. Rivera Navarrete 723 –',
      distrito: 'San Isidro',
      horario: 'Lun - Vie 10:00 am a 07:00 pm',
      horario2: '',
      correo: 'vacaciones@nmviajes.com',
      telefono: '',
      telefono2: '',
      imagen: './assets/agencias/SanIsidro.png'
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
  imagen: string

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
        this.imagen = agencia.imagen
      }
    })
  }

  portalAyuda() {
    // this.route.navigateByUrl("https://ayuda.nmviajes.com/support/home")
    // window.location.href="https://ayuda.nmviajes.com/support/home"
    window.open("https://ayuda.nmviajes.com/support/home", "_blank")
  }
}
