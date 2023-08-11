import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { AccountsService } from 'src/app/Services/accounts.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  recoverPasswordForm: FormGroup;
  message: string = '';

  constructor(
      private _formBuilder: FormBuilder,
      private _validatorsService: ValidatorsService,
      private _accountService: AccountsService,
      private notification: NotificationService,
      public activeModal: NgbActiveModal,
      public loaderSubjectService: LoaderSubjectService
  ) {
  }

  ngOnInit(): void {
    this.recoverPasswordForm = this.createRecoverPasswordForm();
  }

  createRecoverPasswordForm(): FormGroup {
    return this._formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.emailPattern)]]
    });
  }

  validateRecoverPasswordForm(field: string) {
    return this.recoverPasswordForm.controls[field].errors
      && this.recoverPasswordForm.controls[field].touched;
  }

  openLoginModal() {
    this.activeModal.close({
      success: false,
      openLogin: true
    });
  }

  get recoverPasswordEmailErrorMessage(): string {
    const errors = this.recoverPasswordForm.get('email')?.errors;

    if (errors?.required)
      return 'Ingresa tu email';
    else if (errors?.minlength)
      return `Un email válido tiene ${errors?.minlength.requiredLength} caracteres como mínimo.`;
    else if (errors?.pattern)
      return 'El valor ingresado no tiene formato de email.';

    return '';
  }

  getPassword(email: string) {
    this.initLoading();

    if (this.recoverPasswordForm.invalid) {
      this.closeLoading();
      this.recoverPasswordForm.markAllAsTouched();
      return;
    }

    this._accountService.passwordSend(email).subscribe(resp => {
      if (resp.IsSuccess) {
        this.message = resp.Message;
        this.toggleModalGetPass();
        this.activeModal.close({
          success: true
        });
      } else this.notification.showNotificacion('Error', resp.Message, 10);
    }, () => {
      this.closeLoading();
      this.notification.showNotificacion('Error', 'Error del servidor', 10);
    }, () => this.closeLoading());
  }

  initLoading() {
    const textSend = 'CARGANDO'
    this.loaderSubjectService.showText(textSend)
    this.loaderSubjectService.showLoader();
  }

  closeLoading() {
    this.loaderSubjectService.closeLoader();
  }

  toggleModalGetPass() {
    const modal = document.getElementById('ModalChangePass');
    if (!modal) return;
    bootstrap.Modal.getOrCreateInstance(modal).toggle();
  }
}
