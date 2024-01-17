import { NgModule } from '@angular/core';
import { ToolbarMobileComponent } from './toolbar-mobile.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, ButtonModule,RouterModule],
    exports: [ToolbarMobileComponent],
    declarations: [
    ToolbarMobileComponent
  ],
    providers: [],
})
export class ToolbarMobileModule { }
