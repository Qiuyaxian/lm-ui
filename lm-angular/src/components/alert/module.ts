import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { cleanStyle } from '../../utils';
import { LmSlotModule } from '../slot';
import { LmDialogModule } from '../dialog'
// 注册组件
import { LmAlert } from './alert'
@NgModule({
  declarations: [LmAlert],
  exports: [LmAlert],
  providers: [],
  imports: [CommonModule, FormsModule, LmSlotModule, LmDialogModule],
  entryComponents: [LmAlert]
})
export class LmAlertModule {}