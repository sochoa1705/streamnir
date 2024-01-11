import { NgModule } from '@angular/core';
import { ModalUnsavedComponent } from './modal-unsaved.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ButtonModule, CommonModule],
    exports: [ModalUnsavedComponent],
    declarations: [
        ModalUnsavedComponent
    ],
    providers: [],
})
export class ModalUnsavedModule { }
