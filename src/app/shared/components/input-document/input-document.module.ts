import { NgModule } from '@angular/core';
import { InputDocumentComponent } from './input-document.component';
import { ComprarModule } from 'src/app/Component/home-page/comprar/comprar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [ComprarModule,FormsModule, ReactiveFormsModule],
    exports: [InputDocumentComponent],
    declarations: [
    InputDocumentComponent
  ],
    providers: [],
})
export class InputDocumentModule { }
