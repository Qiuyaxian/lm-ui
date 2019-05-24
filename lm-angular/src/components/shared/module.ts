import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TransferDomDirective } from '../../directives/transfer-dom'
import { 
	ExDynamicService, 
	DocumentWrapper, 
	WindowWrapper 
} from '../shared/services'
// import { ElCSSValuePipe } from './pipe'
export function getDocument(): any { return document }
export function getWindow(): any { return window }

@NgModule({
  declarations: [
    // ElCSSValuePipe,
    TransferDomDirective
  ],
  exports: [
    // ElCSSValuePipe,
    TransferDomDirective
  ],
  imports: [CommonModule],
  entryComponents: [],
})
export class VupSharedModule {
  static forRoot(): ModuleWithProviders {
    return { 
      ngModule: VupSharedModule, 
      providers: [
        // ExDynamicService,
        // ElCSSValuePipe,
        { provide: DocumentWrapper, useFactory: getDocument },
        { provide: WindowWrapper, useFactory: getWindow },
	  ]
	}
  }
}