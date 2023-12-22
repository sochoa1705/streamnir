/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-input-toogle',
	templateUrl: './input-toggle.component.html',
	styleUrls: ['./input-toggle.component.scss'],
})
export class InputToggleComponent implements OnInit{
	
	@Input() checked = false;
	@Input() name?: any = 'input';
	@Input() isSmall = false;
	@Output() clickChecked = new EventEmitter<boolean>()
	
	isChecked: boolean = false;

	ngOnInit(): void {
		this.isChecked=this.checked;
	}
	
	changeToogle(){
		this.clickChecked.emit(!this.isChecked)
	}
}
