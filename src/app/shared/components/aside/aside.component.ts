import { Component, Input, OnInit } from '@angular/core';
import { Aside } from 'src/app/Models/general/aside';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  @Input()
  slider!: Aside[];
  @Input()
  images!: Aside[];

  constructor() { }

  ngOnInit(): void {
  }

}
