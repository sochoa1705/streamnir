import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesComponent } from './packages.component';



@NgModule({
  declarations: [
    PackagesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PackagesComponent]
})
export class PackagesModule { }
