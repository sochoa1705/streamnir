import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {
  @Input() image!: string;
  @Input() title!: string;
  @Input() description!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
