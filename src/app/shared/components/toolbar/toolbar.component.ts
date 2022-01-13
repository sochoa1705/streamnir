import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() menu: any[]
  constructor(
    public route: Router,
  ) { }
  ngOnInit() { }
  toHome() {
    this.route.navigateByUrl('/')
  }
  to(e: any){
    window.location.href = e;
  }
}
