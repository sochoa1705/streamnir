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
import { ReservaVuelosService } from '../../../Services/reservaVuelos/reserva-vuelos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  destiny: any = []
  destinyString: any

  constructor(
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
    public asidePresenterService: AsidePresenterService,
    public destinyService: DestinyService,
    public reservaVuelosService: ReservaVuelosService
  ) { }

  ngOnInit(): void {
    this.listDestiny()
    this.testReserva()
  }

  testReserva() {
    let payload = {
      "segmentSelected": [
        0, 0
      ],
      "IdGroup": "1b005365-4685-4a56-8585-396138baf367",
      "passengers": [
        {
          "type": "ADT",
          "name": "RODRIGO",
          "lastName": "CCANCCE",
          "birthday": "1998-02-20",
          "documentType": 0,
          "documentNumber": "72154521",
          "gender": "M",
          "email": "rodrigo98_22@outlook.com",
          "phone": "989454123"
        }
      ],
      "contact": {
        "name": "RODRIGO",
        "lastName": "RAQUI",
        "email": "rodrigo98_22@outlook.com",
        "address": "LIMA",
        "phones": [
          {
            "phoneNumber": "989454123"
          }
        ]
      }
    }
    this.reservaVuelosService.reserva(payload).subscribe({
      next: (response: any) => console.log(response)
    }

    )

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
}