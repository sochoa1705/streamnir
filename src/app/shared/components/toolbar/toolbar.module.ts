import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ ToolbarComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [ ToolbarComponent ]
})
export class ToolbarModule { }
