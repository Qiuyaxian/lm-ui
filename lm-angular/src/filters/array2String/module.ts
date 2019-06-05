import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core'
import { array2StringPipe } from './array2String'
@NgModule({
  entryComponents: [],
  imports: [CommonModule],
  exports: [array2StringPipe],
  declarations: [array2StringPipe]
})
export class array2StringPipeModule {
  static forRoot(): ModuleWithProviders {
    return { 
      ngModule: array2StringPipeModule, 
      providers: []
    }
  }
}