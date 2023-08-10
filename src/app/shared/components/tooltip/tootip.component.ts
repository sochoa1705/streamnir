import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tootip.component.html',
    styleUrls: [ './tootip.component.scss' ]
})

export class ToolTipComponent implements OnInit {
    @Input() isTop=false;
    constructor() { }

    ngOnInit() { }
}