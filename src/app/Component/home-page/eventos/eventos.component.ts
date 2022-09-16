import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('message', function (event) {
      debugger
      //console.log('event height ', event);

      let frm = document.getElementById("iframeEventos");
      let height = event.data + 50;
      if (event.data?.scroolTop) {
        this.window.scrollTo(0, 0);
      }

      // @ts-ignore: Object is possibly 'null'.
      (frm || {}).style?.height = height + 'px';
    });
  }

}
