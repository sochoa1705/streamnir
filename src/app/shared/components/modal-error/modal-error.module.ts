import { NgModule } from '@angular/core';
import { ModalErrorComponent } from './modal-error.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    imports: [ButtonModule],
    exports: [ModalErrorComponent],
    declarations: [
    ModalErrorComponent
    ],
    providers: [],
})
export class ModalErrorModule { }
