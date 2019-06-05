import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LmSlotModule } from '../slot';
// 引入指令
import { LmEventDirectiveModule } from '../../directives';

import { LmInlineDescModule } from '../inline-desc';
import { LmGroupModule } from '../group'
import { LmCell } from './cell';
@NgModule({
  declarations: [LmCell],
  exports: [LmCell],
  providers: [],
  imports: [ 
    CommonModule, 
    LmEventDirectiveModule, 
    LmSlotModule, 
    LmInlineDescModule, 
    LmGroupModule
  ],
  entryComponents: [LmCell]
})
export class LmCellModule {}