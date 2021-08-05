import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  @Input()
  image!: string;
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
  pack!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
