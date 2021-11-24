import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/Services/mock/offers.service';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { CoverageService } from '../../../Services/coverage/coverage.service';
import { DestinyService } from '../../../Services/destiny/destiny.service';
import { take } from 'rxjs/operators';
import { NMRequest } from 'src/app/Models/base/NMRequest';

@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.component.html',
  styleUrls: ['./seguros.component.scss']
})
export class SegurosComponent implements OnInit {
  destiny: any = []
  destinyString: any
  
  constructor(
    public offersService: OffersService,
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
    public destinyService: DestinyService,
  ) {}

  ngOnInit(): void {
    //localStorage.clear()
    //Se conecta al servicio destinos por unica vez
    if (localStorage.getItem('destiny') !== null) {
      this.destinyString = localStorage.getItem('destiny')
      this.destiny = JSON.parse(this.destinyString)
    } else {
      this.listDestiny()
    }

    // console.log(this.dataPagePresenterService.data.sections[0].id === 0)
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