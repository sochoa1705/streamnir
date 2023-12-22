import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-mobile',
  templateUrl: './toolbar-mobile.component.html',
  styleUrls: ['./toolbar-mobile.component.scss']
})
export class ToolbarMobileComponent implements OnInit {

  constructor(private _router:Router) { }
  @Input()  showItems=false
  @Input() isLogged=false
  @Output() clickButton=new EventEmitter()
  @Output() clickInfo=new EventEmitter()

  ngOnInit(): void {
  }

  clickAction(){
    this.clickButton.emit();
  }

  redirect(e: any) {
    this.clickInfo.emit();
    if(e.charAt(0)=='/') this._router.navigateByUrl(e)
		else window.open(e, '_blank');
	}
}
