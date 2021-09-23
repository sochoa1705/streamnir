import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/Services/mock/offers.service';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { AsidePresenterService } from 'src/app/Services/presenter/aside/aside-presenter.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { FlightsService } from 'src/app/Services/flights/flights.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  selectedIndex: number = 0;

  zoom = 12
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  constructor(
    public flightsService: FlightsService,
    public offersService: OffersService,
    public packagesService: PackagesService,
    public asidePresenterService: AsidePresenterService,
    public dataPagePresenterService: DataPagePresenterService,
  ) { }

  ngOnInit(): void {
    this.getListVuelos()
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  getListVuelos() {
    // console.log(e)
    this.flightsService.getCiudades('lim').subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Ciudades cargadas')
    )
  }

}
