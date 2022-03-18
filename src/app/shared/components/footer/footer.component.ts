import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() title1!: string;
  @Input() list1!: any;
  @Input() title2!: string;
  @Input() list2!: any;
  @Input() title3!: string;
  @Input() span!: string;
  @Input() addrees!: string;
  @Input() libro!: string;
  @Input() linkLibro!: string;

  constructor(
    public route: Router,
  ) { }
  showMenuProd: Boolean = true;
  showProducto() {
    this.showMenuProd = this.showMenuProd ? false : true;
  }
  showMenuConocenos: Boolean = true;
  showConocenos() {
    this.showMenuConocenos = this.showMenuConocenos ? false : true;
  }
  to(e: any) {
    window.location.href = e;
  }
  toOficinas() {
    this.route.navigate(['/nuestras-agencias'])
  }
}
