import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { LmSlot } from './slot';
// import { LmSlotDirective } from './slot.directive'
@NgModule({
  declarations: [LmSlot],
  exports: [LmSlot],
  providers: [],
  imports: [CommonModule],
  entryComponents: [LmSlot],
  schemas: [ NO_ERRORS_SCHEMA ] // add this line
})
export class LmSlotModule {}