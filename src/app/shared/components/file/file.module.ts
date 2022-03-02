import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './file.component';
import { MaterialModule } from '../../material.module';



@NgModule({
  declarations: [
    FileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],exports:[
    FileComponent
  ]
})
export class FileModule { }
