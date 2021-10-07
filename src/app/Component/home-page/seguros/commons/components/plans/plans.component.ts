import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CoverageService } from 'src/app/Services/coverage/coverage.service';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  json = {
    detailPay: 'safe',
    filter: 'filtersafe',
    title: 'Viaja seguro',
    asistencia: false,
    reembolso: false,
    detalleViaje: false,
    detalleCobertura: true,
    cupon: false
  }

  constructor(public route: Router,
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
    public coverageService: CoverageService,
  ) { }

  ngOnInit(): void {
    let payload = {
      "Aplicacion": "Intranet",
      "CodigoSeguimiento": "Test",
      "CodigosEntorno": "PROD/NMO/NMO",
      "Parametros": {
        "CodigoISOPais": "510",
        "Agencia": "87823",
        "Sucursal": "0",
        "CodigoProducto": "MX",
        "CodigoTarifa": "96045",
        "Edad": "40",
        "TipoModalidad": "1"
      }
    }
    this.coverageService.getCoverage(payload).subscribe(
      data => console.log(data['Resultado']),
      err => console.log(err),
      () => console.log('Ciudades cargadas')
    )
  }

  shop() {
    const navigationExtras: NavigationExtras = { state: this.json };
    this.route.navigateByUrl('/home/comprar', navigationExtras);

  }

}
