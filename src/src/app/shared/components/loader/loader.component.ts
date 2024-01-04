import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderSubjectService } from './service/loader-subject.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  private loaderSbscripcionRef = new Subscription()
  showLoader = false
  textService!: string;
  constructor(
    private loaderSubjectService: LoaderSubjectService,
  ) { }

  ngOnInit(): void {
    this.loader()
  }

  ngOnDestroy() {
    this.loaderSbscripcionRef.unsubscribe()
  }

  private loader() {
    this.loaderSbscripcionRef = this.loaderSubjectService.loader$.subscribe(state => {
      this.showLoader = state
    })
  }

}
