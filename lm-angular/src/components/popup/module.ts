import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { cleanStyle } from '../../utils';
import { LmSlotModule } from '../slot';

// 注册组件
import { LmPopup } from './popup'
@NgModule({
  declarations: [LmPopup],
  exports: [LmPopup],
  providers: [],
  imports: [CommonModule, FormsModule, LmSlotModule],
  entryComponents: [LmPopup]
})
export class LmPopupModule {}