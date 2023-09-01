import { Component, OnInit } from '@angular/core';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { DollarChangeService } from '../../Services/dollarChange/dollar-change.service';
import { environment } from '../../../environments/environment';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { BusinessUnitService } from 'src/app/Services/businessUnit/business-unit.service';
import { MainService } from '../../Services/presenter/main/main.service';
import { NavigationEnd, Router } from '@angular/router';

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

    // Renombrando valores para SEO - Inicio
    document.getElementsByTagName("title")[0].innerHTML = environment.SEO.home.title;

    let description = document.getElementsByName('description')[0];
    description.setAttribute("content", environment.SEO.home.description);

    const canonical = document.querySelector("link[rel='canonical']")
    canonical?.setAttribute("href", environment.SEO.home.url);

    const alternate = document.querySelector("link[rel='alternate']")
    alternate?.setAttribute("href", environment.SEO.home.url);

    const og_title = document.querySelector("meta[property='og:title']")
    og_title?.setAttribute("content", environment.SEO.home.title);

    const og_description = document.querySelector("meta[property='og:description']")
    og_description?.setAttribute("content", environment.SEO.home.description);

    const og_image = document.querySelector("meta[property='og:image']")
    og_image?.setAttribute("content", environment.SEO.home.image);

    const og_image_height = document.querySelector("meta[property='og:image:height']")
    og_image_height?.setAttribute("content", environment.SEO.home.height);

    const og_image_width = document.querySelector("meta[property='og:image:width']")
    og_image_width?.setAttribute("content", environment.SEO.home.width);

    const og_url = document.querySelector("meta[property='og:url']")
    og_url?.setAttribute("content", environment.SEO.home.url);
    // Renombrando valores para SEO - Fin
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
