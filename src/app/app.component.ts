
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import * as bootstrap from 'bootstrap';
import * as moment from 'moment';
import { combineLatest, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
//import { ConfirmDialogComponent } from './Component/confirm-dialog/confirm-dialog.component';
import { AccountsService } from './Services/accounts.service';
import { TaggingService } from './Services/analytics/tagging.service';
import { NotificationService } from './Services/notification.service';
import { PopupService } from './Services/pop-up/popup.service';
import { LoaderSubjectService } from './shared/components/loader/service/loader-subject.service';
import { Guid } from './shared/utils';
import { ValidatorsService } from './shared/validators/validators.service';


export class LoginPerson {
  constructor(
    public email = "",
    public password = "",
    public recorder = false
  ) { }
}

export class LoginBusiness {
  constructor(
    public email = "",
    public password = "",
    public recorder = false
  ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'NuevoMundoViajes';

  @ViewChild("closeModalSesion") closeModalSesion: ElementRef;
  @ViewChild("closeModalNewAccount") closeModalNewAccount: ElementRef;

  pasajeros: any = [
    {
      adultos: 10,
      ninos: 1,
      infantes: 1
    }
  ]

  //confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  login = new LoginPerson();
  loginB = new LoginBusiness();

  isPerson: boolean = true;
  isPersonLoggin: boolean = true;

  //recoverPasswordForm: FormGroup;

  submitBusiness = false;
  submitPerson = false;

  message: string = '';

  constructor(
    private _popUpSubject: PopupService,
    private _authService: SocialAuthService,
    private _accountService: AccountsService,
    public _matDialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    public loaderSubjectService: LoaderSubjectService,
    private notification: NotificationService,
    private readonly router: Router,
  ) {
    this.cerrarBoxClicFuera();

    this._authService.authState.subscribe((user) => {

      if (user.provider == "GOOGLE") {
        this.saveSocialAccount(user.firstName, user.lastName, user.email, "G", user.id, user.photoUrl)
      }

    });
  }

  initLoading() {
    const textSend = 'CARGANDO'
    this.loaderSubjectService.showText(textSend)
    this.loaderSubjectService.showLoader();
  }

  closeLoading() {
    this.loaderSubjectService.closeLoader();
  }



  ngOnInit(): void {
    this.taggingPageView();
    //this.recoverPasswordForm = this.createRecoverPasswordForm();

    //debugger

    // const currentDate = moment();
    // const fromDate = moment('29/04/2022', 'DD/MM/YYYY');

    // const missingDays = fromDate.diff(currentDate, 'days');


  }

  taggingPageView() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        TaggingService.pageView(event.urlAfterRedirects)
      }
    });

  }


  closeModal() {
    const closeModalSesion: any = this.closeModalSesion.nativeElement;
    const closeModalNewAccount: any = this.closeModalNewAccount.nativeElement;

    closeModalSesion ? closeModalSesion.click() : null;
    closeModalNewAccount ? closeModalNewAccount.click() : null;
  }


  toggleModalVerificaCorreo() {
    const modal = document.getElementById("ModalVerificaCorreo");

    if (!modal) {
      return;
    }

    bootstrap.Modal.getOrCreateInstance(modal).toggle();
  }


  saveSocialAccount(Firstname: string, FatherLastname: string, Email: string, SocialNetwork: "G" | "F", IdSocialNetwork: string, image: string) {

    this.initLoading();

    const payload = {
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      Caller: {
        Company: "Agil",
        Application: "Interagencias"
      },
      Parameter: {
        Firstname,
        FatherLastname,
        MotherLastname: "",
        Email,
        Password: "",
        IsPerson: true,
        Ruc: "",
        BusinessName: "",
        SocialNetwork,
        IdSocialNetwork
      }
    };

    this._accountService.saveAccount(payload).subscribe({
      next: (response) => {
        this.closeLoading();
        const isSuccess = response.Result.IsSuccess;

        if (isSuccess) {
          this._accountService.guardarStorage(response.Result, image);
          this.closeModal();
          this._matSnackBar.open(`Gracias por registrarte ${response.Result.Firstname} ${response.Result.FatherLastname}`, 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        } else {
          this.notification.showNotificacion("Error", "Error del servidor", 10);
        }


        //this.loaderSubjectService.closeLoader()
      },
      error: (err) => {
        this.closeLoading();
        this.notification.showNotificacion("Error", "Error del servidor", 10);

        //this.loaderSubjectService.closeLoader()
      },
      complete: () => { }
    });

  }



  signOut(): void {
    this._authService.signOut();
  }

  socialMedia: Boolean = true;

  showSocialMedia($event: { index: string | number; }) {
    this.socialMedia = $event.index == 0 ? true : false;
    this.isPerson = $event.index == 0 ? true : false;
  }



  cerrarBoxClicFuera() {
    combineLatest([fromEvent(document, 'click'), this._popUpSubject.state()]).pipe(
      filter(resp => resp[1].open == true)
    ).subscribe(resp => {
      const htmlSelected = (resp[0].target as HTMLElement)
      const popUpElement = document.getElementById(resp[1].id);

      if (htmlSelected.contains(popUpElement)) {
        this._popUpSubject.closePopUp('')
      }
    })
  }
}
