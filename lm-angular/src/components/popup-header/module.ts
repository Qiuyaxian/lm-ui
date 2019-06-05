import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LmPopupHeader } from './popup-header';
// import { LmPopupHeaderDirective } from './slot.directive'
@NgModule({
  declarations: [LmPopupHeader],
  exports: [LmPopupHeader],
  providers: [],
  imports: [CommonModule],
  entryComponents: [LmPopupHeader]
})
export class LmPopupHeaderModule {}