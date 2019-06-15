import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LmSlotModule } from '../slot';

// 注册组件
import { LmActionsheet } from './actionsheet'
@NgModule({
  declarations: [LmActionsheet],
  exports: [LmActionsheet],
  providers: [],
  imports: [CommonModule, FormsModule, LmSlotModule],
  entryComponents: [LmActionsheet]
})
export class LmActionsheetModule {}