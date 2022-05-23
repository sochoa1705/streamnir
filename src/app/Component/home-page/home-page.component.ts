import { Component, OnInit } from '@angular/core';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { DollarChangeService } from '../../Services/dollarChange/dollar-change.service';
import { environment } from '../../../environments/environment';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { BusinessUnitService } from 'src/app/Services/businessUnit/business-unit.service';
import { MainService } from '../../Services/presenter/main/main.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  ipAddress: string = 'xyx'
  businessUnit!: string[]
  dollar!: number
  dataUtil!: string[]
  options: string[]
  constructor(
    public dataPagePresenterService: DataPagePresenterService,
    public dollarChangeService: DollarChangeService,
    public businessUnitService: BusinessUnitService,
    public mainService: MainService,
  ) { }

  ngOnInit(): void {
    //this.getChange()
    this.getBusinessUnit()
    this.getIpCliente()
    this.getMain()

    localStorage.removeItem('filters');
  }

  getMain() {
    this.mainService.getMenu().subscribe({
      next: (response: any) => {
        this.options = response
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getBusinessUnit() {
    if (localStorage.getItem('businessunit') === null) {
      let payload = new NMRequest();

      this.businessUnitService.businessUnit(payload).subscribe(
        data => {
          let linfo = data['Resultado'].filter((und: any) => und.id_unidad_negocio == environment.undidadNegocioAC);
          localStorage.setItem('businessunit', (linfo.length > 0 ? JSON.stringify(linfo[0]) : ''));
          this.businessUnit = linfo
        },
        err => console.log(err)
      )
    }
  }

  getIpCliente() {
    localStorage.setItem('ipCliente', this.ipAddress)
  }
}
