import { Component, OnInit } from '@angular/core';
import { toUp } from 'src/app/shared/utils';

@Component({
  selector: 'app-condiciones-de-reserva',
  templateUrl: './condiciones-de-reserva.component.html',
  styleUrls: ['./condiciones-de-reserva.component.scss']
})
export class CondicionesDeReservaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    toUp()
  }
}
