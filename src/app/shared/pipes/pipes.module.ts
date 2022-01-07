import { NgModule } from '@angular/core';
import { HtmlSanitizerPipe } from './html-sanitizer.pipe';


@NgModule({
    declarations: [HtmlSanitizerPipe],
    exports: [HtmlSanitizerPipe]
})
export class PipesModule { }
