import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './file.component';
import { MaterialModule } from '../../material.module';
import { DirectivesModule } from '../../directives/directives.module';



@NgModule({
  declarations: [
    FileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule
  ],exports:[
    FileComponent
  ]
})
export class FileModule { }
