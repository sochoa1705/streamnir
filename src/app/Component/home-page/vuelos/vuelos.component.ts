import { Component, OnInit } from '@angular/core';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { PackagesService } from '../../../Services/mock/packages.service';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.scss']
})
export class VuelosComponent implements OnInit {
  packages: any = [
    {
      id:5,
      image: './assets/internacionales/cancun.jpg',
      label: 'saliendo de lima',
      destiny: 'México',
      city: 'Cancún',
      span: 'INCLUYE BOLETO',
      price: 858,
      link: '#',
      banner: 6,
      pack: '5 días / 4 noches'
    },
    {
      id: 6,
      image: './assets/package/7-vichayito.jpg',
      label: 'saliendo de lima',
      destiny: 'Perú',
      city: 'Vichayto',
      span: 'INCLUYE BOLETO',
      price: 249,
      link: '#',
      banner: 4,
      pack: '4 días / 3 noches'
    }
  ]
  constructor(
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
  ) { }

  ngOnInit(): void {
  }

}
