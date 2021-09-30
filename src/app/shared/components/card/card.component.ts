import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  itemList!: any[];
  // @Input()
  // image!: string;
  // @Input()
  // label!: string;
  // @Input()
  // destiny!: string;
  // @Input()
  // from!: string;
  // @Input()
  // span!: string;
  // @Input()
  // price!: number;
  // @Input()
  // link!: string;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.itemList);
    
  }

}
