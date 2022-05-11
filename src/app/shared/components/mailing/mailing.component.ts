import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MailingService } from '../../../Services/mailing/mailing.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { InputValidationService } from 'src/app/Services/inputValidation.service';
import { validate } from 'json-schema';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { ModelTaggingSubscripcionOfertas } from 'src/app/Services/analytics/tagging.models';

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
  styleUrls: ['./mailing.component.scss']
})
export class MailingComponent implements OnInit {
  formMAiling: FormGroup
  MSG_NOMBRE: string = 'nombreMail'
  MSG_CORREO: string = 'correoMail'
  MSG_POLITICA: string = 'politicasMail'
  MSG_AUTORIZO: string = 'autorizoMail'
  MSG_EMPTY: string = 'none'
  errors: any[] = []
  ipCliente: any
  validate: boolean
  @Input() title!: string;
  @Input() span!: string;
  message: string
  imgMailing: string
  constructor(
    private mailingService: MailingService,
    private notification: NotificationService,
    public loaderSubjectService: LoaderSubjectService,
    public inputValidator : InputValidationService
  ) {
    this.validate = false
    this.ipCliente = localStorage.getItem('ipCliente')
  }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.formMAiling = new FormGroup({
      nombreMail: new FormControl(),
      correoMail: new FormControl(),
      politicasMail: new FormControl(),
      autorizoMail: new FormControl()
    })
  }

  subscribe(e: any) {
    if (this.validForm()) {
      const textSend = 'Validando suscripción'
      this.loaderSubjectService.showText(textSend)
      this.loaderSubjectService.showLoader()
      let data = this.formMAiling.value
      let payload = {
        "TrackingCode": "000001",
        "MuteExceptions": true,
        "Caller": {
          "Company": "Expertia",
          "Application": "NMViajes",
          "FromIP": this.ipCliente,
          "FromBrowser": "CHROME"
        },
        "Parameter": {
          "Name": data.nombreMail,
          "Email": data.correoMail,
          "AcceptTerms": data.politicasMail,
          "UsePersonalData": data.autorizoMail
        }
      }
      this.mailingService.goMailing(payload).subscribe({
        next: (response) => {
          this.addTag()
          this.validate = true
          let message = response['body'].Result.Message
          let img = response['body'].Result.IsSuccess
          this.message = message
          this.imgMailing = img
          this.loaderSubjectService.closeLoader()

          this.timeMAiling()
        },
        error: (err) => {
          this.loaderSubjectService.closeLoader()
          
          this.notification.showNotificacion("Error", "No se envio la suscripción", 10)

        }
      })
    }
  }
  timeMAiling() {
    setTimeout(() => {
      this.validate = false
      this.formMAiling.reset()
    }, 10000)
  }
  validForm() {
    this.errors = []
    const letter = new RegExp('^[a-zA-Z ]+$', 'i')
    const number = new RegExp('^[0-9]+$', 'i')
    const alphanumeric = new RegExp('^[a-zA-Z0-9 ]+$', 'i')
    const mail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

    let nombreMail: string = this.formMAiling.getRawValue()['nombreMail']
    if (nombreMail === undefined || nombreMail === null || nombreMail.trim() === '') {
      this.errors.push({ name: this.MSG_NOMBRE, message: 'Campo requerido' })
    }
    let correoMail: string = this.formMAiling.getRawValue()['correoMail']
    if (correoMail === undefined || correoMail === null || correoMail.trim() === '') {
      this.errors.push({ name: this.MSG_CORREO, message: 'Campo requerido' })
    }
    if (!mail.test(correoMail)) {
      this.errors.push({ name: this.MSG_CORREO, message: 'Ingresar correo válido' })
    }
    let politicasMail: boolean = this.formMAiling.getRawValue()['politicasMail']
    if (politicasMail === undefined || politicasMail === null || politicasMail == false) {
      this.errors.push({ name: this.MSG_POLITICA, message: 'Políticas es requerido' })
    }
    let autorizoMail: boolean = this.formMAiling.getRawValue()['autorizoMail']
    if (autorizoMail === undefined || autorizoMail === null || autorizoMail == false) {
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
  addTag() {
    const model = new ModelTaggingSubscripcionOfertas();
    TaggingService.tagSubscripcionOfertas(model);
  }

}
