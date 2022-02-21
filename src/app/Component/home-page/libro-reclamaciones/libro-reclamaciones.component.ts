import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { toUp } from '../../../shared/utils';
import { LibroReclamacionesService } from '../../../Services/libro/libro-reclamaciones.service';
import { LoaderSubjectService } from '../../../shared/components/loader/service/loader-subject.service';

@Component({
  selector: 'app-libro-reclamaciones',
  templateUrl: './libro-reclamaciones.component.html',
  styleUrls: ['./libro-reclamaciones.component.scss']
})
export class LibroReclamacionesComponent implements OnInit {
  formLibro: FormGroup
  ipCliente: any
  today: any
  tipoReclamo: string
  numCode: number | undefined
  errors: any[] = []
  MSG_EMPTY: string = 'none'
  MSG_PUNTO_VENTA: string = 'puntoVenta'
  MSG_ASESORA: string = 'asesora'
  // MSG_FECHA: string = 'fecha'
  MSG_NOMBRE: string = 'nombre'
  MSG_TIPO_DOC: string = 'tipoDoc'
  MSG_NUM_DOC: string = 'numDoc'
  MSG_TELEFONO: string = 'telefono'
  MSG_DIRECCION: string = 'direccion'
  MSG_EMAIL: string = 'email'
  // MSG_MENOR: string = 'menor'
  MSG_BIEN_CONTRATADO: string = 'bienContratado'
  MSG_DESCRIPCION_BIEN_CONTRATADO: string = 'descripcionBienContratado'
  MSG_MONTO_RECLAMO: string = 'montoReclamado'
  MSG_TIPO_RECLAMO: string = 'tipoReclamo'
  MSG_DETALLE_RECLAMO: string = 'detalleReclamo'
  MSG_PEDIDO: string = 'pedido'
  MSG_OBSERVACIONES: string = 'observaciones'
  MSG_POLITICA: string = 'politica'
  MSG_AUTORIZO: string = 'autorizo'
  constructor(
    public libroService: LibroReclamacionesService,
    public loaderSubjectService: LoaderSubjectService,
  ) {
    this.ipCliente = localStorage.getItem('ipCliente')
    let day = new Date()
    this.today = String(day.getDate()).padStart(2, '0') + "/" + String((day.getMonth() + 1)).padStart(2, '0') + "/" + day.getFullYear()
  }
  ngOnInit(): void {
    this.createForm()
    toUp()
    console.log(this.numCode)
  }
  createForm() {
    this.formLibro = new FormGroup({
      puntoVenta: new FormControl(),
      asesora: new FormControl(),
      fecha: new FormControl(this.today),
      nombre: new FormControl(),
      tipoDoc: new FormControl(),
      numDoc: new FormControl(),
      telefono: new FormControl(),
      direccion: new FormControl(),
      email: new FormControl(),
      menor: new FormControl(),
      bienContratado: new FormControl(),
      descripcionBienContratado: new FormControl(),
      montoReclamado: new FormControl(),
      tipoReclamo: new FormControl(),
      detalleReclamo: new FormControl(),
      pedido: new FormControl(),
      observaciones: new FormControl(),
      politica: new FormControl(),
      autorizo: new FormControl(),
    })
  }
  enviar() {
    let data = this.formLibro.value
    
    if (this.validForm()) {
      const textSend = 'SE ESTAN VALIDADNDO SUS DATOS!'
      this.loaderSubjectService.showText(textSend)
    let payload = {
      "TrackingCode": "00000",
      "MuteExceptions": false,
      "Caller": {
        "Company": "Agil",
        "Application": "Interagencias"
      },
      "Parameter": {
        "Ip": this.ipCliente,
        "Browser": "Chrome",
        "Person": {
          "Firstname": data.nombre,
          "Lastname": "Oshiro",
          "DocumentType": "DNI",
          "DocumentNumber": data.numDoc,
          "Phone": data.telefono,
          "Address": data.direccion,
          "Email": data.email
        },
        "Type": data.tipoReclamo,
        "Service": {
          "Name": data.descripcionBienContratado,
          "Amount": Number(data.montoReclamado),
          "Observation": data.observaciones,
          "Comment": data.detalleReclamo
        },
        "Adviser": {
          "FullName": data.asesora,
          "PointSale": data.puntoVenta
        }
      }
    }
    console.log(payload)
    this.libroService.libroData(payload).subscribe({
      next: response => {
        this.numCode = response['Result']['Code']
        this.loaderSubjectService.closeLoader()
      },
      error: err =>{ console.log(err)
      this.loaderSubjectService.closeLoader()}
    })
  }
  }
  validForm() {
    this.errors = []
    const letter = new RegExp('^[a-zA-Z ]+$', 'i')
    const number = new RegExp('^[0-9]+$', 'i')
    const alphanumeric = new RegExp('^[a-zA-Z0-9 ]+$', 'i')
    const mail = new RegExp('^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$', 'i')

    let puntoVenta: string = this.formLibro.getRawValue()['puntoVenta']
    if (puntoVenta === undefined || puntoVenta === null || puntoVenta.trim() === '') {
      this.errors.push({ name: this.MSG_PUNTO_VENTA, message: 'Campo requerido' })
    }
    let asesora: string = this.formLibro.getRawValue()['asesora']
    if (asesora === undefined || asesora === null || asesora.trim() === '') {
      this.errors.push({ name: this.MSG_ASESORA, message: 'Campo requerido' })
    }
    let nombre: string = this.formLibro.getRawValue()['nombre']
    if (nombre === undefined || nombre === null || nombre.trim() === '') {
      this.errors.push({ name: this.MSG_NOMBRE, message: 'Nombre es requerido' })
    }
    let tipoDoc: string = this.formLibro.getRawValue()['tipoDoc']
    if (tipoDoc === undefined || tipoDoc === null || tipoDoc.trim() === '') {
      this.errors.push({ name: this.MSG_TIPO_DOC, message: 'Campo requerido' })
    } 
    let numDoc: string = this.formLibro.getRawValue()['numDoc']
    if (numDoc === undefined || numDoc === null || numDoc.trim() === '') {
      this.errors.push({ name: this.MSG_NUM_DOC, message: 'Campo requerido' })
    }
    let telefono: string = this.formLibro.getRawValue()['telefono']
    if (telefono === undefined || telefono === null || telefono.trim() === '') {
      this.errors.push({ name: this.MSG_TELEFONO, message: 'teléfono es requerido' })
    }
    let direccion: string = this.formLibro.getRawValue()['direccion']
    if (direccion === undefined || direccion === null || direccion.trim() === '') {
      this.errors.push({ name: this.MSG_DIRECCION, message: 'Dirección es requerido' })
    }
    if (!number.test(telefono)) {
      this.errors.push({ name: this.MSG_TELEFONO, message: 'solo números' })
    }
    let email: string = this.formLibro.getRawValue()['email']
    if (email === undefined || email === null || email.trim() === '') {
      this.errors.push({ name: this.MSG_EMAIL, message: 'Email requerido' })
    }
    let bienContratado: string = this.formLibro.getRawValue()['bienContratado']
    if (bienContratado === undefined || bienContratado === null || bienContratado.trim() === '') {
      this.errors.push({ name: this.MSG_BIEN_CONTRATADO, message: 'Campo es requerido' })
    }
    let descripcionBienContratado: string = this.formLibro.getRawValue()['descripcionBienContratado']
    if (descripcionBienContratado === undefined || descripcionBienContratado === null || descripcionBienContratado.trim() === '') {
      this.errors.push({ name: this.MSG_DESCRIPCION_BIEN_CONTRATADO, message: 'Campo es requerido' })
    }
    let montoReclamado: string = this.formLibro.getRawValue()['montoReclamado']
    if (montoReclamado === undefined || montoReclamado === null || montoReclamado.trim() === '') {
      this.errors.push({ name: this.MSG_MONTO_RECLAMO, message: 'Campo es requerido' })
    }
    let tipoReclamo: boolean = this.formLibro.getRawValue()['tipoReclamo']
    if (tipoReclamo === undefined || tipoReclamo === null || tipoReclamo  === false) {
      this.errors.push({ name: this.MSG_TIPO_RECLAMO, message: 'tipo es requerido' })
    }
    let detalleReclamo: string = this.formLibro.getRawValue()['detalleReclamo']
    if (detalleReclamo === undefined || detalleReclamo === null || detalleReclamo.trim() === '') {
      this.errors.push({ name: this.MSG_DETALLE_RECLAMO, message: 'Detalle es requerido' })
    }
    let pedido: string = this.formLibro.getRawValue()['pedido']
    if (pedido === undefined || pedido === null || pedido.trim() === '') {
      this.errors.push({ name: this.MSG_PEDIDO, message: 'Campo es requerido' })
    }
    let observaciones: string = this.formLibro.getRawValue()['observaciones']
    if (observaciones === undefined || observaciones === null || observaciones.trim() === '') {
      this.errors.push({ name: this.MSG_OBSERVACIONES, message: 'Campo es requerido' })
    }
    let politica: boolean = this.formLibro.getRawValue()['politica']
    if (politica === undefined || politica === null || politica == false) {
      this.errors.push({ name: this.MSG_POLITICA, message: 'Políticas es requerido' })
    }
    let autorizo: boolean = this.formLibro.getRawValue()['autorizo']
    if (autorizo === undefined || autorizo === null || autorizo == false) {
      this.errors.push({ name: this.MSG_AUTORIZO, message: 'Campo requerido' })
    }
    return this.errors.length === 0
  }
  getMessage(messageKey: any) {
    return this.errors.filter((item: any) => item.name === messageKey).length > 0 ? this.errors.filter((item: any) => item.name === messageKey)[0].message : this.MSG_EMPTY
  }
  getMessageArray(index: any, messageKey: any) {
    return this.errors.filter((item: any) => item.indice === index && item.name === messageKey).length > 0;
  }
  reenviar(){
    this.numCode = undefined
    this.formLibro.reset()
  }

  isChecked: Boolean = false;
  checkSelect(value:boolean){
    this.isChecked = value;
  }
}
