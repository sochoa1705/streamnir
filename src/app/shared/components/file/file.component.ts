import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountsService } from 'src/app/Services/accounts.service';
import { FileService } from '../../../Services/file.service';
import { Guid } from '../../utils';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class FileComponent implements OnInit {

  archivo64:any;

  @Input() name:string;

  loading = false;

  imageSave:string;

  constructor(private sanitizer: DomSanitizer,private _snackBar: MatSnackBar, private fileService:FileService, private accountsService:AccountsService) { }

  ngOnInit(): void {

    this.archivo64 = this.accountsService.getUserStorage().image;
  
  }

  async getFile(evento:any){
    const archivoTmp = evento.target.files[0];

    const archiveBlob:any =  await this.blobFile(archivoTmp);

    this.archivo64 = archiveBlob.base;

    if(this.archivo64){
      this.loadImages(archivoTmp)
    }

  }

  loadImages = (file:any) => {
    try {

      const parameter = {
        File:file,
        UserId: 44290
      }
      const formData = new FormData();
        formData.append('Parameter.UserId', "44290")
        formData.append('Parameter.File', file)
        formData.append('TrackingCode', "3f3fef")
        formData.append('MuteExceptions', "true")
        formData.append('Caller.Company', "Agil")
        formData.append('Caller.Application', "Interagencias")

      this.loading = true;
      this.fileService.uploadImg(formData)
        .subscribe(res => {
          this.loading = false;
          if(res.IsSuccess){
            const url = res.Url + '?parame=' + Guid();
            this.accountsService.guardarImage(url);
            this.accountsService.dispatchLogged(true);
          }

        }, (err)=>{
          this.archivo64 = this.accountsService.getUserStorage().image;
          this.openSnackBar("Ocurrio un error en la subida, escoga otra imagen");
          this.loading = false;
        
        });
    } catch (e) {
      this.openSnackBar("Ocurrio un error ")
      this.loading = false;
    }
  }

  blobFile = async ($event: any) => new Promise((resolve):any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })


  
  openSnackBar(message: string, action: string = "Error") {
    this._snackBar.open(message, "", {
      duration: 10000,
    });
  }

}
