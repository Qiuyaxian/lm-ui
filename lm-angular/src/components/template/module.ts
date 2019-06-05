import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LmSlotModule } from '../slot';
import { LmTemplate } from './template';
@NgModule({
  declarations: [LmTemplate],
  exports: [LmTemplate],
  providers: [],
  imports: [CommonModule, LmSlotModule],
  entryComponents: [LmTemplate]
})
export class LmTemplateModule {}