import { Component, OnInit } from '@angular/core';
import { toUp } from '../../../shared/utils';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.scss']
})
export class PoliticasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    toUp()
  }
}
