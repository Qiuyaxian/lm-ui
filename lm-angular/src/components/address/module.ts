import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LmPopupPickerModule } from '../popup-picker'
import { LmGroupModule } from '../group'

import { LmAddress } from './address';

@NgModule({
  declarations: [LmAddress],
  exports: [LmAddress],
  imports: [CommonModule, FormsModule, LmPopupPickerModule, LmGroupModule],
  entryComponents: [LmAddress]
})
export class LmAddressModule {}