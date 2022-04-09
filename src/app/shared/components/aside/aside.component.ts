import { Component, Input, OnInit } from '@angular/core';
import { Aside } from 'src/app/Models/general/aside';
import { ModelTaggingSlidersBanners } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { IGalleryImage, IGalleryService } from 'src/app/Services/presenter/data-page-presenter.models';
import { getFileName } from '../../utils';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  @Input()
  slider!: IGalleryImage[];
  @Input()
  images!: IGalleryImage[];

  constructor() { }


  toSlider(e: IGalleryImage,nombre:"slider" | "banner",index:number, array:number) {
    if(e.RedirectLink){
      window.open(e.RedirectLink, '_blank');
    }
    if(e.PathImage){
      this.addTag(e,nombre,index,array)
    }
  }
  addTag(gallery:IGalleryImage,nombre:"slider" | "banner",index:number, array:number) {

    let position = "";
    let nombreTagg:"Slider Principal" | "Banner Principal";
    
    if(nombre === "slider"){
      nombreTagg = "Slider Principal";
      position = `Slide ${index + 1} de ${array}` 
    }else {
      nombreTagg = "Banner Principal";
      position = `Card ${index + 1} de ${array}` 
    }

    const tag = new ModelTaggingSlidersBanners(
      getFileName(gallery.PathImage),
      "...",
      nombreTagg,
      position
    )

   TaggingService.clickSliderBanners(tag);
  }
}
