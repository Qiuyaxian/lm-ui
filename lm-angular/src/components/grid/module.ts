import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LmSlotModule } from '../slot';
import { LmGrid } from './grid';
import { LmGridItem } from './grid-item';
// 引入指令
import { LmEventDirectiveModule } from '../../directives'
@NgModule({
  declarations: [LmGrid, LmGridItem],
  exports: [LmGrid, LmGridItem],
  imports: [CommonModule, LmEventDirectiveModule, LmSlotModule],
  entryComponents: [LmGrid, LmGridItem]
})
export class LmGridModule {}