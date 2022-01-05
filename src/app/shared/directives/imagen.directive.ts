import { Directive, ElementRef, HostListener, Input, OnInit } from "@angular/core";


@Directive({
    selector: 'img[appImgDefault]'
  })

 export class DefaultImageDirective implements OnInit{
    // @Input() src:string;
    // @Input() default:string;

    constructor(private elementRef:ElementRef){}


    ngOnInit(): void {
        const img = this.elementRef.nativeElement;
    }

    @HostListener('error') cargarImgDefecto() {
      const element = this.elementRef.nativeElement;
      element.src = "../../../assets/img/no-image.jpg" 
      // console.log('error');
        // this.src = "assets\img\no-image.png";
      }

  
 
  }


