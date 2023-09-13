import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {
    @Input() text: string='';
	@Input() disabled = false;
	@Input() color = 'primary'; 
	@Input() icon?: string;
	@Input() right?: boolean;
	@Input() left?: boolean;
    @Input() w100=false;
    @Input() size='md';
    @Input() isSucess = false;
    @Input() isLoader = false;
    @Output() onClick = new EventEmitter<MouseEvent>();

    constructor() { }
    ngOnInit() { }

    clickButton(){
        this.onClick.emit()
    }
}