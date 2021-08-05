import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
  styleUrls: ['./mailing.component.scss']
})
export class MailingComponent implements OnInit {
  @Input() title!: string;
  @Input() span!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
