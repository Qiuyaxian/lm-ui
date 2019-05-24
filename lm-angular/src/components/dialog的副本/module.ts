import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VupDialog } from './dialog'
// import { DialogService } from './dialog.service'
import { VupSharedModule } from '../shared/module'

export function getDocument(): any { return document }
export function getWindow(): any { return window }

@NgModule({
  declarations: [VupDialog],
  exports: [VupDialog],
  imports: [CommonModule, VupSharedModule],
  entryComponents: [VupDialog],
})
export class DialogModule {
  static forRoot(): ModuleWithProviders {
    return { 
      ngModule: DialogModule, 
      providers: [
	    // DialogService,
	    ]
    }
  }
}