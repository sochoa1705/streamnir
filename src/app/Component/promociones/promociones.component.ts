import { Component, OnInit } from '@angular/core';
import { toUp } from 'src/app/shared/utils';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    toUp();
  }

}
