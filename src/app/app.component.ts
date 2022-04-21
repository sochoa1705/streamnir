
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



  message: string = '';

  constructor(
    private _popUpSubject: PopupService,
    public _matDialog: MatDialog,
    public loaderSubjectService: LoaderSubjectService,
    private readonly router: Router,
  ) {
    this.cerrarBoxClicFuera();

  }


  ngOnInit(): void {
    this.taggingPageView();
  }

  taggingPageView() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        TaggingService.pageView(event.urlAfterRedirects)
      }
    });

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
