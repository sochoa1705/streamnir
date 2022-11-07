import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageVideoComponent } from './package-video.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PackageVideoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [PackageVideoComponent]
})
export class PackageVideoModule { }
