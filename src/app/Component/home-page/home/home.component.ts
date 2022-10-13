import { Component, OnInit } from '@angular/core';
import { AsidePresenterService } from 'src/app/Services/presenter/aside/aside-presenter.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from 'src/app/Services/accounts.service';
import * as bootstrap from 'bootstrap';
import { FlightService } from 'src/app/api/api-nmviajes/services';
import { EGalleryCode, IGalleryImage } from 'src/app/Services/presenter/data-page-presenter.models';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  destiny: any = []
  destinyString: any

  airfare: any;

  sliderDestacados: IGalleryImage[] = [];
  bannersDestacados: IGalleryImage[] = [];
  bannersCorporativos: IGalleryImage[] = [];

  loadedGallery = false;

  constructor(
    public dataPagePresenterService: DataPagePresenterService,
    public asidePresenterService: AsidePresenterService,
    public destinyService: DestinyService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _accountsService: AccountsService,
    public loaderSubjectService: LoaderSubjectService
  ) { }

  ngOnInit(): void {
    this.listDestiny()
    this.getConfirmacion();
    this.getGallery();
    //this.getAirfare();

    localStorage.removeItem('filters');
  }

  getConfirmacion() {

    this._activatedRoute.params.pipe(
      filter(params => params.id),
      tap(() => this.initLoad()),
      switchMap(param => this._accountsService.confirmationAccount(param.id))
    ).subscribe(resp => {
      this.loaderSubjectService.closeLoader();
      if (resp.IsSuccess) {
        this._accountsService.dispatchConfirmate(true);
        this.toggleConfirmation();
      }
    })
  }

  initLoad() {
    const textSend = 'Cargando'
    this.loaderSubjectService.showText(textSend)
    this.loaderSubjectService.showLoader()
  }

  getGallery() {
    this.dataPagePresenterService.getDataGallery().subscribe(data => {
      //this.sliderDestacados = data.filter(item => item.Code === EGalleryCode.slider_destacados).map(item => item.Images)[0];
      this.sliderDestacados = data.filter(item => item.Code === EGalleryCode.slider_destacados || item.Code === EGalleryCode.slider_destacados2).map(item => item.Images)[0];
      this.sliderDestacados.push(this.sliderDestacados[0]);

      this.bannersDestacados = data.filter(item => item.Code === EGalleryCode.banners_destacados).map(item => item.Images)[0];
      this.bannersCorporativos = data.filter(item => item.Code === EGalleryCode.banners_corporativos).map(item => item.Images)[0];

      this.loadedGallery = true;
    })
  }


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
      },
      error: error => console.log(error),
    }
    )
  }



}