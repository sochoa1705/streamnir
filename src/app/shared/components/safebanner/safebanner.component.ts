import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-safebanner',
  templateUrl: './safebanner.component.html',
  styleUrls: ['./safebanner.component.scss']
})
export class SafebannerComponent implements OnInit {
  @Input() options:any;
  @Input() plans:any;

  constructor() { }

  ngOnInit(): void {
  }

}
