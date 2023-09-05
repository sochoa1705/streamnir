import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { Router, ActivatedRoute } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DestinyService } from '../../../Services/destiny/destiny.service';
import { ChangeRQ } from '../../../Models/general/changeRQ.interface';
import { environment } from '../../../../environments/environment.prod';
import { NMRequestBy } from '../../../Models/base/NMRequestBy';
import { DollarChangeService } from '../../../Services/dollarChange/dollar-change.service';
import { take } from 'rxjs/operators';
import { NMRequest } from '../../../Models/base/NMRequest';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { EGalleryCode, IGalleryImage } from 'src/app/Services/presenter/data-page-presenter.models';
export interface State {
  flag: string;
  name: string;
  population: string;
}
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() show!: boolean
  @Input() options: any

  form!: FormGroup;
  form3!: FormGroup;
  selected = 'option1';
  model!: NgbDateStruct;
  tabResult: any = 'tab1';

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null
  fromDate2: NgbDate | null
  fromDate3: NgbDate | null
  fromDate4: NgbDate | null
  toDate: NgbDate | null;

  cities: Array<any> = [];
  citiesOrigenSelect: Array<any> = [];
  citiesDestinosSelect: Array<any> = [];
  origen: any;
  destino: any;
  selectedTab: number;

  banner: IGalleryImage;
  bannerMobile: IGalleryImage;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private destineService: DestinyService,
    public dollarChangeService: DollarChangeService,
    public dataPagePresenterService: DataPagePresenterService
  ) {
    this.fromDate = calendar.getToday();
    this.fromDate2 = calendar.getToday();
    this.fromDate3 = calendar.getToday();
    this.fromDate4 = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.createForm();
    this._activatedRoute.params.subscribe((product) => {
      const url = this._router.url;

      if (url === '/vuelos' ||
        url === '/paquetes' ||
        url === '/armapaquete' ||
        url === '/vuelohotel' ||
        url === '/hoteles' ||
        url === '/autos' ||
        url === '/actividades')
        this.casos(url);
      else
        this.casos(product.tab);
    });

    this.getMainBanner();
  }

  getMainBanner() {
    this.dataPagePresenterService.getDataGallery().subscribe(data => {
      this.banner = data.filter(item => item.Code === EGalleryCode.banner_principal)[0].Images[0];
      this.bannerMobile = data.filter(item => item.Code === EGalleryCode.banner_principal_mobile)[0].Images[0];
    })
  }

  casos(e: any) {
    switch (e) {
      case 'vuelos':
      case '/vuelos':
        this.selectedTab = 0
        break;
      case 'paquetes':
      case '/paquetes':
        this.selectedTab = 1
        break;
      case 'armapaquete':
      case '/armapaquete':
        this.selectedTab = 2
        break;
      case 'vuelohotel':
      case '/vuelohotel':
        this.selectedTab = 3
        break;
      case 'hoteles':
      case '/hoteles':
        this.selectedTab = 4
        break;
      case 'autos':
      case '/autos':
        this.selectedTab = 5
        break;
      case 'actividades':
      case '/actividades':
        this.selectedTab = 6
        break;
      default:
        break;
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  // private getDestinyOrigin(){
  //   this.destineService.getDestinyPaqueteDinamico('truji','FLIGHT_HOTEL').subscribe(res => {
  //     console.log('res ', res);
  //   });
  // }

  createForm() {
    this.form = new FormGroup({
      clase: new FormControl('economy'),
      origen: new FormControl(),
      destino: new FormControl(''),
      origenHotel: new FormControl(''),
    });

    this.form3 = new FormGroup({
      origen: new FormControl(''),
      destino: new FormControl(''),

      initHour: new FormControl(''),
      lastHour: new FormControl('')
    });
  }

  navigateToResponseUrl(url: string): void {
    window.location.href = url;
  }

  changeTab(value: MatTabChangeEvent) {
    if (value.index == 7) {
      this.callService();
    }
  }

  autoComplete(e: any, type: number, typeSearch = 'FLIGHT_HOTEL') {
    this.cities = [];
    // let elemento = this.origen.nativeElement;
    let elemento = e.target;

    let value = elemento.value;
    if (value.length == 0) {
      elemento.classList.remove('auto');
    } else {
      elemento.classList.add('auto');
    }
    if (value.length >= 3) {
      this.getListCiudades(value, type, typeSearch);
    }
  }

  getListCiudades(e: any, type: number, typeSearch = 'FLIGHT_HOTEL') {
    this.destineService.getDestinyPaqueteDinamico(e, typeSearch).subscribe(
      data => {
        this.cities = data;
        if (type === 1) {
          this.citiesOrigenSelect = data;
        } else {
          this.citiesDestinosSelect = data;
        }
      },
      err => console.log(err),
      () => console.log('Ciudades cargadas')
    )
  }

  callService(): void {
    this.getChange();
    this.listDestiny();
  }

  getChange() {
    console.log(new Date());

    let lChange: ChangeRQ = {
      Fecha: environment.today(new Date()),
      IdMoneda: "SOL",
      IdEmpresa: "1"
    }
    let payload = new NMRequestBy<ChangeRQ>(lChange)
    this.dollarChangeService.changeDollar(payload).pipe(take(5)).subscribe({
      next: (response) => {
        localStorage.setItem('tipoCambio', response);
      }
    })
  }

  listDestiny() {
    let payload = new NMRequest();

    this.destineService.getDestiny(payload).pipe(take(1)).subscribe({
      next: (response) => {
        localStorage.setItem('destiny', JSON.stringify(response['Resultado']));
      },
      error: error => console.log(error),
    }
    )
  }
}
