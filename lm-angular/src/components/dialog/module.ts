import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LmSlotModule } from '../slot';

// 注册组件
import { LmDialog } from './dialog'
@NgModule({
  declarations: [LmDialog],
  exports: [LmDialog],
  providers: [],
  imports: [CommonModule, FormsModule, LmSlotModule],
  entryComponents: [LmDialog]
})
export class LmDialogModule {}