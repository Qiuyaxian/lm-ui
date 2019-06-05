import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LmScroll } from './scroll';
import { LmSlotModule } from '../slot'
@NgModule({
  declarations: [LmScroll],
  exports: [LmScroll],
  imports: [CommonModule, LmSlotModule],
  entryComponents: [LmScroll]
})
export class LmScrollModule {}