import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VupModule } from '../../../src/components/vup-angular.module'


@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    VupModule,
  ],
  entryComponents: [],
})
export class ExamplesSharedModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ExamplesSharedModule, providers: [] }
  }
}