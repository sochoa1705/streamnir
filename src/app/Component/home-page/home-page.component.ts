import { Component, OnInit } from '@angular/core';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { DollarChangeService } from '../../Services/dollarChange/dollar-change.service';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { NMRequestBy } from '../../Models/base/NMRequestBy';
import { ChangeRQ } from '../../Models/general/changeRQ.interface';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { BusinessUnitService } from 'src/app/Services/businessUnit/business-unit.service';
import { IpClienteService } from 'src/app/Services/ipCliente/ip-cliente.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  ipAddress!: string
  businessUnit!: string[]
  dollar!: number
  dataUtil!: string[]
  constructor(
    public dataPagePresenterService: DataPagePresenterService,
    public dollarChangeService: DollarChangeService,
    public businessUnitService: BusinessUnitService,
    public ipClienteService: IpClienteService,
  ) { }

  ngOnInit(): void {
    this.getChange()
    this.getBusinessUnit()
    this.getIpCliente()
  }

  getChange() {
    let lChange: ChangeRQ = {
      Fecha: environment.today(new Date()),
      IdMoneda: "SOL",
      IdEmpresa: "1"
    }
    let payload = new NMRequestBy<ChangeRQ>(lChange)
    this.dollarChangeService.changeDollar(payload).pipe(take(5)).subscribe({
      next: (response) => {
        localStorage.setItem('tipoCambio', response)
        this.dollar = response
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
    this.ipClienteService.ipCliente().subscribe((res: any) => {
      this.ipAddress = res.ip;
      localStorage.setItem('ipCliente', this.ipAddress)
      console.log(res);
    });
  }

}
