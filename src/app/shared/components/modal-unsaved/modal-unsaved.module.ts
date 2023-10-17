import { NgModule } from '@angular/core';
import { ModalUnsavedComponent } from './modal-unsaved.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

@NgModule({
    imports: [ButtonModule],
    exports: [ModalUnsavedComponent],
    declarations: [
        ModalUnsavedComponent
    ],
    providers: [],
})
export class ModalUnsavedModule { }
