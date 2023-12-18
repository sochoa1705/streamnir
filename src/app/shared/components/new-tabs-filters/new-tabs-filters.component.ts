import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { dataTabs } from './data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-tabs-filters',
  templateUrl: './new-tabs-filters.component.html',
  styleUrls: ['./new-tabs-filters.component.scss']
})
export class NewTabsFiltersComponent implements OnInit {
  @Input() indexSelectedTab=0;
  @Output() clickedTab = new EventEmitter();
  @ViewChild('slider', { static: false }) slider: ElementRef;
  isDown = false;
  startX: number;
  scrollLeft: number;

  constructor(private router: Router) { }

  dataTabs=dataTabs;
  indexActive=0;
  indexHover=-1;
  ngOnInit(): void {
    this.indexActive=this.indexSelectedTab;
  }
  clickTab(index:number){
      this.indexActive=index;
      this.clickedTab.emit(index);
      // redirect to insurances page
      if(index === 7) this.router.navigate(['/seguros']);
  }

  
  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    this.isDown = true;
    this.slider.nativeElement.classList.add('active');
    this.startX = e.pageX - this.slider.nativeElement.offsetLeft;
    this.scrollLeft = this.slider.nativeElement.scrollLeft;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isDown = false;
    this.slider.nativeElement.classList.remove('active');
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isDown = false;
    this.slider.nativeElement.classList.remove('active');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.slider.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 3; // scroll-fast
    this.slider.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

}
