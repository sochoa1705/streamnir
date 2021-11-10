import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.scss']
})
export class DestinosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  id: any = "option1";
  showOption(ids: any) {
    this.id = ids;
    //console.log(this.id);
  }
}
