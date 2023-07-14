import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/Services/mock/offers.service';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { CoverageService } from '../../../Services/coverage/coverage.service';
import { DestinyService } from '../../../Services/destiny/destiny.service';
import { take } from 'rxjs/operators';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { environment } from 'src/environments/environment';

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
  ) { }

  ngOnInit(): void {

    //Se conecta al servicio destinos por unica vez
    if (localStorage.getItem('destiny') !== null) {
      this.destinyString = localStorage.getItem('destiny')
      this.destiny = JSON.parse(this.destinyString)
    } else {
      this.listDestiny()
    }

    // Renombrando valores para SEO - Inicio
    document.getElementsByTagName("title")[0].innerHTML = environment.SEO.insurance.title;

    let description = document.getElementsByName('description')[0];
    description.setAttribute("content", environment.SEO.insurance.description);

    const canonical = document.querySelector("link[rel='canonical']")
    canonical?.setAttribute("href", environment.SEO.insurance.url);

    const alternate = document.querySelector("link[rel='alternate']")
    alternate?.setAttribute("href", environment.SEO.insurance.url);

    const og_title = document.querySelector("meta[property='og:title']")
    og_title?.setAttribute("content", environment.SEO.insurance.title);

    const og_description = document.querySelector("meta[property='og:description']")
    og_description?.setAttribute("content", environment.SEO.insurance.description);

    const og_image = document.querySelector("meta[property='og:image']")
    og_image?.setAttribute("content", environment.SEO.insurance.image);

    const og_image_height = document.querySelector("meta[property='og:image:height']")
    og_image_height?.setAttribute("content", environment.SEO.insurance.height);

    const og_image_width = document.querySelector("meta[property='og:image:width']")
    og_image_width?.setAttribute("content", environment.SEO.insurance.width);

    const og_url = document.querySelector("meta[property='og:url']")
    og_url?.setAttribute("content", environment.SEO.insurance.url);
    // Renombrando valores para SEO - Fin
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