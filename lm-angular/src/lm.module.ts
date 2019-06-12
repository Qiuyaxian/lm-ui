import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 引入自定义组件
import { LmTransferDomDirectiveModule } from './directives';
import { LmTemplateModule } from './components/template';
import { LmHeaderModule } from './components/header';
import { LmScrollModule } from './components/scroll';
import { LmSlotModule } from './components/slot';
import { LmGridModule } from './components/grid';
import { LmGroupModule } from './components/group';
import { LmCellModule } from './components/cell';
import { LmInlineDescModule } from './components/inline-desc';
import { LmSwitchModule } from './components/switch';
import { LmDialogModule } from './components/dialog';
import { LmAlertModule, LmAlertService } from './components/alert';
import { LmActionsheetModule, LmActionsheetService } from './components/actionsheet';
import { LmPopupModule } from './components/popup';
import { LmFlexboxModule } from './components/flexbox';
import { LmPickerModule } from './components/picker';
import { LmPopupPickerModule } from './components/popup-picker';
import { LmPopupHeaderModule } from './components/popup-header';
import { LmAddressModule } from './components/address';
import { LmDemoModule } from './components/demo'
// 按需导出,方便按需导入
export * from './directives';
export * from './components/template';
export * from './components/header';
export * from './components/scroll';
export * from './components/slot';
export * from './components/grid';
export * from './components/group';
export * from './components/cell';
export * from './components/inline-desc';
export * from './components/switch';
export * from './components/dialog';
export * from './components/alert';
export * from './components/actionsheet';
export * from './components/popup';
export * from './components/flexbox';
export * from './components/picker';
export * from './components/popup-picker';
export * from './components/popup-header';
export * from './components/address';
export * from './components/demo';
// 注册模块
@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [
    LmTransferDomDirectiveModule,
    LmTemplateModule,
    LmHeaderModule,
    LmScrollModule,
    LmSlotModule,
    LmGridModule,
    LmGroupModule,
    LmInlineDescModule,
    LmCellModule,
    LmSwitchModule,
    LmDialogModule,
    LmAlertModule,
    LmActionsheetModule,
    LmPopupModule,
    LmFlexboxModule,
    LmPickerModule,
    LmPopupHeaderModule,
    LmPopupPickerModule,
    LmAddressModule,
    LmDemoModule
  ]
})
/**
 * 提供注册全局注册机制
 */
export class LmModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LmModule,
      providers: []
    };
  }
}