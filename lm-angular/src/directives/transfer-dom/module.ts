import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core'
import { TransferDomDirective } from './transfer-dom'

export {
  TransferDomDirective
}
// 对外提供注册 指令模块
@NgModule({
  entryComponents: [],
  imports: [CommonModule],
  exports: [TransferDomDirective],
  declarations: [TransferDomDirective]
})
export class LmTransferDomDirectiveModule {
  static forRoot(): ModuleWithProviders {
    return { 
      ngModule: LmTransferDomDirectiveModule, 
      providers: []
    }
  }
}