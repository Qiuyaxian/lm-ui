import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LmSlotModule } from '../slot';
// 注册组件
import { LmGroup } from './group'
import { LmGroupTitle } from './group-title'

@NgModule({
  declarations: [LmGroup, LmGroupTitle],
  exports: [LmGroup, LmGroupTitle],
  providers: [],
  imports: [CommonModule, LmSlotModule],
  entryComponents: [LmGroup, LmGroupTitle]
})
export class LmGroupModule {}