import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";

@Directive({
    selector: 'img[appImgDefault]'
  })

  export class DefaultImageDirective implements OnInit{
    // @Input() src:string;
    @Input() default:string;
    @Output() errorEvent = new EventEmitter<boolean>();

    constructor(private elementRef:ElementRef){}

    ngOnInit(): void {
        const img = this.elementRef.nativeElement;
    }

    @HostListener('error') cargarImgDefecto() {
      this.errorEvent.emit(true);
      const element = this.elementRef.nativeElement;
      element.src = this.default ||  "../../../assets/img/no-image.webp"
      }

}


