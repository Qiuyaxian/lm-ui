import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LmFlexbox } from './flexbox';
import { LmFlexboxItem } from './flexbox-item';
// 引入指令
@NgModule({
  declarations: [LmFlexbox, LmFlexboxItem],
  exports: [LmFlexbox, LmFlexboxItem],
  imports: [CommonModule],
  entryComponents: [LmFlexbox, LmFlexboxItem]
})
export class LmFlexboxModule {}