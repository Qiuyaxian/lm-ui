import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LmPopupPicker } from './popup-picker';
import { array2StringPipeModule, Value2namePipeModule } from '../../filters'

import { LmPickerModule } from '../picker'
import { LmPopupHeaderModule } from '../popup-header'
import { LmPopupModule } from '../popup'
import { LmGroupModule } from '../group'
import { LmCellModule } from '../cell'
import { LmTransferDomDirectiveModule } from '../../directives'

@NgModule({
  declarations: [LmPopupPicker],
  exports: [LmPopupPicker],
  providers: [],
  imports: [CommonModule, FormsModule, array2StringPipeModule, Value2namePipeModule, LmPickerModule, LmPopupHeaderModule, LmPopupModule, LmGroupModule, LmCellModule, LmTransferDomDirectiveModule],
  entryComponents: [LmPopupPicker]
})
export class LmPopupPickerModule {}