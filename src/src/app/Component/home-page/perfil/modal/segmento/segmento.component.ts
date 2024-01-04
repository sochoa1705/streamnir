import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-segmento',
  templateUrl: './segmento.component.html',
  styleUrls: ['./segmento.component.scss'],
})
export class SegmentoComponent implements OnInit {
  @Input() data: any;
  @Input() isDeparture: boolean = true;
  constructor() {}

  ngOnInit(): void {

  }
  getAirlineName(text: string): string {
    return text.split('|')[1];
  }
}
