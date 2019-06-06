import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core'
import { FormsModule } from '@angular/forms';
// 注册组件
import { LmDemo } from './demo'
@NgModule({
  declarations: [LmDemo],
  exports: [LmDemo],
  providers: [],
  imports: [CommonModule, FormsModule],
  entryComponents: [LmDemo]
})
export class LmDemoModule {}