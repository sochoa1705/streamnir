import { Component, OnInit } from '@angular/core';
import { ListaTarifaRequest } from 'src/app/Models/Request/ListaTarifasRequest';
import { SignatureModel } from 'src/app/Models/Request/SignatureModel';
import { CoreService } from 'src/app/Services/core.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { take } from 'rxjs/operators';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.scss']
})
export class VuelosComponent implements OnInit {
  destiny: any = []
  destinyString: any
  public OfertaVuelosRequest: ListaTarifaRequest = new ListaTarifaRequest();
  ListaTarifa: any;
  constructor(
    private coreService: DestinyService
  ) { }
  ngOnInit(): void {
    this.listDestiny()
  }

  listDestiny() {
    let payload = new NMRequest();
    this.coreService.getDestiny(payload).pipe(take(1)).subscribe({
      next: (response) => {
        this.destiny = response['Resultado']
        localStorage.setItem('destiny', JSON.stringify(this.destiny));
      },
      error: error => console.log(error),
    }
    )
  }
}