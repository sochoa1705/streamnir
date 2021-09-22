import { Component, OnInit } from '@angular/core';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(
    public dataPagePresenterService: DataPagePresenterService,

  ) { }

  ngOnInit(): void {
  }

}
