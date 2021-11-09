import { Component, OnInit } from '@angular/core';
import { BusinessUnitService } from 'src/app/Services/businessUnit/business-unit.service';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { AsidePresenterService } from 'src/app/Services/presenter/aside/aside-presenter.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  destiny: any = []
  destinyString: any

  constructor(
    public businessUnitService: BusinessUnitService,
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
    public asidePresenterService: AsidePresenterService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('businessunit') == null) {
      let payload = new NMRequest();

      this.businessUnitService.businessUnit(payload).subscribe(
        data => {
          let linfo = data['Resultado'].filter((und: any) => und.id_unidad_negocio == environment.undidadNegocioAC);
          localStorage.setItem('businessunit', (linfo.length > 0 ? JSON.stringify(linfo[0]) : ''));
        },
        err => console.log(err),
        () => console.log('unidad cargada')
      )
    }
  }
}