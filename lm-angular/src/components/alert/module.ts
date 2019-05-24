import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AlertComponent } from './alert.component'
import { AlertProps } from './alert.props'
import { VupSharedModule } from '../shared/module'
export function getDocument(): any { return document }
export function getWindow(): any { return window }
import { DialogModule } from '../dialog/module'

@NgModule({
  declarations: [AlertComponent],
  exports: [AlertComponent],
  imports: [CommonModule, VupSharedModule, DialogModule],
  entryComponents: [AlertComponent],
})
export class AlertModule {
  static forRoot(): ModuleWithProviders {
    return { 
      ngModule: AlertModule, 
      providers: [
	      AlertProps
	    ]
    }
  }
}