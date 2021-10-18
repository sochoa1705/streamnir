import { Component, OnInit } from '@angular/core';
import { BusinessUnitService } from 'src/app/Services/businessUnit/business-unit.service';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { AsidePresenterService } from 'src/app/Services/presenter/aside/aside-presenter.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public businessUnitService: BusinessUnitService,
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
    public asidePresenterService: AsidePresenterService,
  ) { }

  ngOnInit(): void {
    let payload = {
      "Aplicacion": "Intranet",
      "CodigoSeguimiento": "Test",
      "CodigosEntorno": "PROD/NMO/NMO"
    }

    this.businessUnitService.businessUnit(payload).subscribe(
      data => console.log(data['Resultado']),
      err => console.log(err),
      () => console.log('unidad cargada')
    )
  }

}
