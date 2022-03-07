import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ ToolbarComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    DirectivesModule
  ],
  exports: [ ToolbarComponent ]
})
export class ToolbarModule { }
