import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

@Component({
  selector: 'app-nuestras-agencias',
  templateUrl: './nuestras-agencias.component.html',
  styleUrls: ['./nuestras-agencias.component.scss']
})
export class NuestrasAgenciasComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow
  position: any

  markers = [
    {
      position: {
        lat: -12.12392986652241,
        lng: -77.02075056599759,
      },
      label: {
        color: 'red',
        text: 'NM VIAJES',
      },
      title: 'Marker title ',
      info: 'Marker info '
    }
  ]

// lat: any =  -12.12392986652241
// long: any = -77.02075056599759

zoom = 16
center: google.maps.LatLngLiteral
options: google.maps.MapOptions = {
  zoomControl: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  mapTypeId: '',
  maxZoom: 15,
  minZoom: 8,
}

agencias = [
  {
    id: 1,
    direccion: 'Av. 28 de Julio 1136 -',
    distrito: 'Miraflores',
    horario: 'Lun - Vie 10:00 am a 07:00 pm',
    correo: 'vacaciones@nmviajes.com',
    position: {
      lat: -12.12392986652241,
      lng: -77.02075056599759,
    }
},
  {
    id: 2,
    direccion: 'Av. José Pardo 801 -',
    distrito: 'Miraflores',
    horario: 'Lun - Vie 10:00 am a 07:00 pm',
    horario2: 'Sab 10:.. am - 2:00 pm',
    correo: 'vacaciones@nmviajes.com',
    position: {
      lat: -12.118939663488002,
      lng: -77.03650639600475,
    }
  },
  {
    id: 3,
    distrito: 'Monterrico - Surco',
    direccion: 'Av. Primavera 1352 -',
    horario: 'Lun - Vie 10:00 am a 07:00 pm',
    horario2: 'Sab 10:00 am - 2:00 pm',
    correo: 'reservasprimavera@nmviajesexpress.com',
    telefono: '745-7638',
    telefono2: '745-7639',
    position: {
      lat: -12.109777949992738,
      lng: -76.97449801577703,
    }
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
constructor() { }

ngOnInit(): void {
  this.agenciaView(1)

    navigator.geolocation.getCurrentPosition((position) => {
    this.center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }
  })
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
      this.position = agencia.position
    }
  })
}

}
