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
    private popUpSubject:PopupService
  ) { }

  ngOnInit(): void {
    this.listDestiny()
    this.cerrarBoxClicFuera()
  }

  cerrarBoxClicFuera(){
    combineLatest([fromEvent(document, 'click'), this.popUpSubject.state()]).pipe(
      filter(resp => resp[1].open == true)
    ).subscribe(resp => {
      const htmlSelected = (resp[0].target as HTMLElement)
      const popUpElement = document.getElementById(resp[1].id);

      if (htmlSelected.contains(popUpElement)) {
        this.popUpSubject.closePopUp('')
      } 

    })

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