import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-card-checkout',
    templateUrl: './card-checkout.component.html',
    styleUrls: ['./card-checkout.component.scss']
})

export class CardCheckoutComponent implements OnInit {
    @Input() padding = true;
    constructor() { }
    ngOnInit() { }
}