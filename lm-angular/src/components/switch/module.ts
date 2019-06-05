import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cleanStyle } from '../../utils';
import { LmSlotModule } from '../slot';
import { LmInlineDescModule } from '../inline-desc';
import { LmGroupModule } from '../group';
// 注册组件
import { LmSwitch } from './switch'
@NgModule({
  declarations: [LmSwitch],
  exports: [LmSwitch],
  providers: [],
  imports: [CommonModule, FormsModule, LmInlineDescModule, LmGroupModule, LmSlotModule],
  entryComponents: [LmSwitch]
})
export class LmSwitchModule {}