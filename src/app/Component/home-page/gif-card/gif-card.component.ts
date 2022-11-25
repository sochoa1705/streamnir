import { Component, OnInit } from '@angular/core';
import { toUp } from 'src/app/shared/utils';

@Component({
  selector: 'app-gif-card',
  templateUrl: './gif-card.component.html',
  styleUrls: ['./gif-card.component.scss']
})
export class GifCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    toUp();
  }

}
