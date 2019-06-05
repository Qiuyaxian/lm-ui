import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core'
import { Value2namePipe } from './value2name'
@NgModule({
  entryComponents: [],
  imports: [CommonModule],
  exports: [Value2namePipe],
  declarations: [Value2namePipe]
})
export class Value2namePipeModule {
  static forRoot(): ModuleWithProviders {
    return { 
      ngModule: Value2namePipeModule, 
      providers: []
    }
  }
}