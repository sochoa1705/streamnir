import { Component, OnInit } from '@angular/core';
import { toUp } from '../../../shared/utils';

@Component({
  selector: 'app-responsabilidad-social',
  templateUrl: './responsabilidad-social.component.html',
  styleUrls: ['./responsabilidad-social.component.scss']
})
export class ResponsabilidadSocialComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    toUp()
  }

}
