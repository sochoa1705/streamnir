import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountsService } from 'src/app/Services/accounts.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { textChangeRangeIsUnchanged } from 'typescript';
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

  imagenUrl:string;

  isErrorImagenUrl = false;

  @Input() name:string;

  loading = false;

  imageSave:string;

  socialNetwork:"G" | "F" | null  = null;

  constructor(private sanitizer: DomSanitizer,
    private notificationService: NotificationService
    ,private _snackBar: MatSnackBar, private fileService:FileService, private accountsService:AccountsService,
    private notification: NotificationService) { }

  ngOnInit(): void {

    this.imagenUrl = this.accountsService.getUserStorage().image;
    this.socialNetwork = this.accountsService.getUserStorage().socialNetwork;

    // console.log("object");
  
  }

  showNotification(){
    if(this.socialNetwork == "G"){
      this.notification.showNotificacion("Error", "Debe cambiar la imagen por Google",10);

    }else if(this.socialNetwork == "F"){
      this.notification.showNotificacion("Error", "Debe cambiar la imagen por Facebook",10);

    }


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

      const usuarioStorage:any = localStorage.getItem("usuario");
      const usuarioDb:any = JSON.parse(usuarioStorage);

      const formData = new FormData();
        formData.append('Parameter.UserId', usuarioDb.id)
        formData.append('Parameter.File', file)
        formData.append('TrackingCode',  Guid())
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
          }else{
            this.notificationService.showNotificacion("Error", res.Message,10);
          }
        }, (err:any)=>{
          this.archivo64 = this.accountsService.getUserStorage().image;
          this.notificationService.showNotificacion("Error", err)
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
      duration: 4000,
    });
  }

}
