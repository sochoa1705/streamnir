import { Component, OnInit } from '@angular/core';
import { BusinessUnitService } from 'src/app/Services/businessUnit/business-unit.service';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { AsidePresenterService } from 'src/app/Services/presenter/aside/aside-presenter.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { environment } from 'src/environments/environment';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { concatMap, filter, mergeMap, switchMap, take } from 'rxjs/operators';
import { combineLatest, fromEvent } from 'rxjs';
import { PopupService } from 'src/app/Services/pop-up/popup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from 'src/app/Services/accounts.service';
import * as bootstrap from 'bootstrap';
import { FlightService } from 'src/app/api/api-nmviajes/services';
import { Guid } from 'src/app/shared/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  destiny: any = []
  destinyString: any

  airfare: any;

  constructor(
    //public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
    public asidePresenterService: AsidePresenterService,
    public destinyService: DestinyService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _accountsService: AccountsService,
    private _flightService: FlightService
  ) { }

  ngOnInit(): void {
    this.addTag()
    this.listDestiny()
    this.getConfirmacion();
    //this.getAirfare();
  }

  getConfirmacion() {
    this._activatedRoute.params.pipe(
      filter(params => params.id),
      switchMap(param => this._accountsService.confirmationAccount(param.id))
    ).subscribe(resp => {
      if (resp.IsSuccess) {
        this._accountsService.dispatchConfirmate(true);
        this.toggleConfirmation();
      }
    })
  }

  // getAirfare() {
  //   this._flightService.v1ApiFlightGetMostWantedGet({
  //     TrackingCode: Guid(),
  //     MuteExceptions: environment.muteExceptions,
  //     'Caller.Company': "Agil",
  //     'Caller.Application': "Interagencias"
  //   }).subscribe((res: any) => {
  //     this.airfare = JSON.parse(res).Result;
  //   });
  // }

  aceptConfirm() {
    this.toggleConfirmation();
    this._router.navigateByUrl("/");
    this.openModalSession();
  }

  toggleConfirmation() {
    const modal = document.getElementById("ModalUsuarioVerificado");

    if (!modal) {
      return;
    }

    bootstrap.Modal.getOrCreateInstance(modal).toggle();
  }


  openModalSession() {
    const moodalSession: any = document.querySelector("[data-bs-target='#ModalSesion']");

    if (!moodalSession) {
      return;
    }

    moodalSession.click()

  }


  listDestiny() {
    let payload = new NMRequest();

    this.destinyService.getDestiny(payload).pipe(take(1)).subscribe({
      next: (response) => {
        this.destiny = response['Resultado']
        localStorage.setItem('destiny', JSON.stringify(this.destiny));
        console.log(this.destiny)
      },
      error: error => console.log(error),
    }
    )
  }

  addTag() {
    (<any><any>window).dataLayer = (<any><any>window).dataLayer || [];
    (<any><any>window).dataLayer.push({
      'event': 'virtualPageView',
      'virtualPagePath': '/',
      'virtualPageTitle': 'Home'
    })
  }

}