import { Component, Input, OnInit } from '@angular/core';
import { OffersService } from 'src/app/Services/mock/offers.service';

@Component({
  selector: 'app-card-offer',
  templateUrl: './card-offer.component.html',
  styleUrls: ['./card-offer.component.scss']
})
export class CardOfferComponent implements OnInit {
  @Input()
  service!: string;
  @Input()
  image!: string;
  @Input()
  label!: string;
  @Input()
  destiny!: string;
  @Input()
  from!: string;
  @Input()
  span!: string;
  @Input()
  price!: number;
  @Input()
  link!: string;
  constructor(
  ) { }

  ngOnInit(): void {

  }

}
