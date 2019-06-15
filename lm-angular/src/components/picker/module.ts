import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core'
import { FormsModule } from '@angular/forms';

import { LmSlotModule } from '../slot';
import { LmFlexboxModule } from '../flexbox'
// 注册组件
import { LmPicker } from './picker'
import { LmPickerItem } from './picker-item'

@NgModule({
  declarations: [LmPicker, LmPickerItem],
  exports: [LmPicker, LmPickerItem],
  providers: [],
  imports: [CommonModule, FormsModule, LmSlotModule, LmFlexboxModule],
  entryComponents: [LmPicker, LmPickerItem]
})
export class LmPickerModule {}