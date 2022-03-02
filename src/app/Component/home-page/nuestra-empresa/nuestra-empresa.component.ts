import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuestra-empresa',
  templateUrl: './nuestra-empresa.component.html',
  styleUrls: ['./nuestra-empresa.component.scss']
})
export class NuestraEmpresaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.addTag()
  }

  addTag() {
    (<any><any>window).dataLayer = (<any><any>window).dataLayer || [];
    (<any><any>window).dataLayer.push({
      'event': 'virtualPageView',
      'virtualPagePath': '/home/nuestra-empresa',
      'virtualPageTitle': 'Nuestra empresa'
    })
  }
}
