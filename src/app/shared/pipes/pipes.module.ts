import { NgModule } from '@angular/core';
import { HtmlSanitizerPipe } from './html-sanitizer.pipe';
import { IframeSafePipe } from './iframe-sanitizer.pipe';


@NgModule({
    declarations: [HtmlSanitizerPipe,IframeSafePipe],
    exports: [HtmlSanitizerPipe,IframeSafePipe]
})
export class PipesModule { }
