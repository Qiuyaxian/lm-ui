import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LmSlotModule } from '../slot';
// 注册组件
import { LmInlineDesc } from './inline-desc'
@NgModule({
  declarations: [LmInlineDesc],
  exports: [LmInlineDesc],
  providers: [],
  imports: [CommonModule, LmSlotModule],
  entryComponents: [LmInlineDesc]
})
export class LmInlineDescModule {}