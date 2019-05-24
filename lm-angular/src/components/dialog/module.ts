import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DialogComponent } from './dialog.component'
import { DialogService } from './dialog.service'
import { DialogProps } from './dialog.props'
import { VupSharedModule } from '../shared/module'

export function getDocument(): any { return document }
export function getWindow(): any { return window }

@NgModule({
  declarations: [DialogComponent],
  exports: [DialogComponent],
  imports: [CommonModule, VupSharedModule],
  entryComponents: [DialogComponent],
})
export class DialogModule {
  static forRoot(): ModuleWithProviders {
    return { 
      ngModule: DialogModule, 
      providers: [
	      DialogService,
        DialogProps
	    ]
    }
  }
}