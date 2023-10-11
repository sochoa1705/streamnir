import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TagComponent } from './tag.component';

@NgModule({
  declarations: [
    TagComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [TagComponent],
})
export class TagModule { }
