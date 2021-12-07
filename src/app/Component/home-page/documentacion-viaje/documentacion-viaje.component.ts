import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentacion-viaje',
  templateUrl: './documentacion-viaje.component.html',
  styleUrls: ['./documentacion-viaje.component.scss']
})
export class DocumentacionViajeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onPrint() {
    window.print();
  }
}
