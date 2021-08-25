import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/Services/mock/offers.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {

  constructor(
    public offersService: OffersService,
  ) { }

  ngOnInit(): void {
  }

}
