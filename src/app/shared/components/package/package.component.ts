import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  @Input()
  image!: string;
  @Input()
  rout!: string;
  @Input()
  label!: string;
  @Input()
  destiny!: string;
  @Input()
  city!: string;
  @Input()
  from!: string;
  @Input()
  span!: string;
  @Input()
  price!: number;
  @Input()
  banner!: number;
  @Input()
  link!: string;
  @Input()
  btn!: string;
  @Input()
  pack!: string;
  @Input()
  fly!: string;
  constructor(
    public route: Router,
  ) { }

  ngOnInit(): void {
  }

  toDestiny(e: any){
    console.log(e);
    this.route.navigateByUrl('/home/vuelos/destinos')
  }

}
