import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LmSlotModule } from '../slot';
import { LmHeader } from './header';
// 引入指令
import { LmEventDirectiveModule } from '../../directives'
@NgModule({
  declarations: [LmHeader],
  exports: [LmHeader],
  imports: [CommonModule, LmEventDirectiveModule, LmSlotModule],
  entryComponents: [LmHeader]
})
export class LmHeaderModule {}