import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-newcard-offer',
  templateUrl: './newcard-offer.component.html',
  styleUrls: ['./newcard-offer.component.scss']
})
export class NewcardOfferComponent implements OnInit {

  constructor() { }
  @Input() title=''
  @Input() price=0
  @Input() description=''
  @Input() urlImage=''
  @Input() isPackage=false;
  @Input() numNight=0
  @Input() numStart=0

  ngOnInit(): void {
  }

}
