import { Component, OnInit } from '@angular/core';
import { ListaTarifaRequest } from 'src/app/Models/Request/ListaTarifasRequest';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

    // Renombrando valores para SEO - Inicio
    document.getElementsByTagName("title")[0].innerHTML = environment.SEO.flights.title;

    let description = document.getElementsByName('description')[0];
    description.setAttribute("content", environment.SEO.flights.description);

    const canonical = document.querySelector("link[rel='canonical']")
    canonical?.setAttribute("href", environment.SEO.flights.url);

    const alternate = document.querySelector("link[rel='alternate']")
    alternate?.setAttribute("href", environment.SEO.flights.url);

    const og_title = document.querySelector("meta[property='og:title']")
    og_title?.setAttribute("content", environment.SEO.flights.title);

    const og_description = document.querySelector("meta[property='og:description']")
    og_description?.setAttribute("content", environment.SEO.flights.description);

    const og_image = document.querySelector("meta[property='og:image']")
    og_image?.setAttribute("content", environment.SEO.flights.image);

    const og_image_height = document.querySelector("meta[property='og:image:height']")
    og_image_height?.setAttribute("content", environment.SEO.flights.height);

    const og_image_width = document.querySelector("meta[property='og:image:width']")
    og_image_width?.setAttribute("content", environment.SEO.flights.width);

    const og_url = document.querySelector("meta[property='og:url']")
    og_url?.setAttribute("content", environment.SEO.flights.url);
    // Renombrando valores para SEO - Fin
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