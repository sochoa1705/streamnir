import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-why-choose-us',
  templateUrl: './section-why-choose-us.component.html',
  styleUrls: ['./section-why-choose-us.component.scss']
})
export class SectionWhyChooseUsComponent implements OnInit {

  constructor() { }
  @Input() dataSection:any[]=[];
  ngOnInit(): void {
  }

}
