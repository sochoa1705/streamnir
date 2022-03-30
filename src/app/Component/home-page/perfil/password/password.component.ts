import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/Component/confirm-dialog/confirm-dialog.component';
import { AccountsService } from 'src/app/Services/accounts.service';
import { Guid } from 'src/app/shared/utils';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { environment } from 'src/environments/environment';
import { PasswordService } from './password.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  hideCurrentPassword: boolean = false;

  changePasswordForm: FormGroup;

  userId: number;

  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    private _formBuilder: FormBuilder,
    private _accountService: AccountsService,
    private _passwordService: PasswordService,
    private _validatorsService: ValidatorsService,
    private _matSnackBar: MatSnackBar,
    public _matDialog: MatDialog
  ) {
    this.userId = this._accountService.getUserStorage().id;
  }

  ngOnInit(): void {
    this.changePasswordForm = this.createChangePasswordForm();
  }

  createChangePasswordForm(): FormGroup {
    return this._formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.passwordPattern)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.passwordPattern)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.passwordPattern)]]
    }, {
      validators: [this._validatorsService.equalFields('newPassword', 'confirmPassword')]
    });
  }

  validateChangePasswordForm(field: string) {
    return this.changePasswordForm.controls[field].errors
      && this.changePasswordForm.controls[field].touched;
  }

  showPasswordChange(): void {
    this.hideCurrentPassword = true;
  }

  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    if (this.changePasswordForm.valid) {

      // TODO: Validar que la actual contraseña sea la correcta.

      this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
        disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = '¿Estás seguro de cambiar tu contraseña?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result) {

          const payload = {
            TrackingCode: Guid(),
            MuteExceptions: environment.muteExceptions,
            Caller: {
              Company: "Agil",
              Application: "Interagencias"
            },
            Parameter: {
              Id: 0,
              UserId: this.userId,
              Password: this.changePasswordForm.get("newPassword")?.value
            }
          };

          this._passwordService.update(payload).subscribe({
            next: (response) => {

              const isSuccess = response.Result.IsSuccess;

              if (isSuccess) {
                this._matSnackBar.open(`Tu contraseña ha sido cambiada correctamente.`, 'OK', {
                  verticalPosition: 'top',
                  duration: 2000
                });

                this.hideCurrentPassword = false;
              } else {
                this._matSnackBar.open(`${response.Result.Message}`, 'OK', {
                  verticalPosition: 'top',
                  duration: 2000
                });
              }
            },
            error: (err) => {

              console.log(err);
            },
            complete: () => { }
          });
        }
      });

    }
  }
}
