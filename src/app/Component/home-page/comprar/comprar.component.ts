import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffersService } from 'src/app/Services/mock/offers.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {

  constructor(
    public route: Router,
    public offersService: OffersService,
  ) { }

  ngOnInit(): void {
  }

  shop(){
    this.route.navigateByUrl('/home/conformidad');
  }

}
