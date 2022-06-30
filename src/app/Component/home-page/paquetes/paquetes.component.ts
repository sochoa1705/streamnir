import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss']
})
export class PaquetesComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    //this._router.navigate(['/filtro/paquetes']);
  }

}
