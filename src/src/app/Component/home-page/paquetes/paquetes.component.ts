import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss']
})
export class PaquetesComponent implements OnInit {

  destiny: any = [];

  constructor(
    private coreService: DestinyService
  ) { }

  ngOnInit(): void {
    this.listDestiny();
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
