import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core'
import { EventStopPropagationDirective, EventPreventDefaultDirective } from './event-directive'

export {
  EventStopPropagationDirective,
  EventPreventDefaultDirective
}
// 对外提供注册 指令模块
@NgModule({
  entryComponents: [],
  imports: [CommonModule],
  exports: [EventStopPropagationDirective, EventPreventDefaultDirective],
  declarations: [EventStopPropagationDirective, EventPreventDefaultDirective]
})
export class LmEventDirectiveModule {
  static forRoot(): ModuleWithProviders {
    return { 
      ngModule: LmEventDirectiveModule, 
      providers: []
    }
  }
}