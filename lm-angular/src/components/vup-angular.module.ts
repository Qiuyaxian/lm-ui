import { NgModule, ModuleWithProviders } from '@angular/core'

// import { DialogService } from './dialog/dialog.service'
import { VupSharedModule } from './shared/module'
import { DialogModule } from './dialog/module'
import { AlertModule } from './alert/module'

export const VupChildModules: any = {
  VupSharedModule,
  DialogModule,
  AlertModule
}
export const VupModulesGroup: any[] = [
  VupSharedModule,
  DialogModule,
  AlertModule
]

@NgModule({
  imports: [
    VupSharedModule.forRoot(),
    DialogModule.forRoot(),
    AlertModule.forRoot()
  ],
  exports: VupModulesGroup,
})
class VupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: VupModule,
      providers: [],
    }
  }
}

export {
  VupModule,
  // DialogService
}