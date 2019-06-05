import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';

// 注入模块
import { LmModule } from '../../src/lm.module';
/**
 * 开发流程 先定义组件文件 => 在components 下的 vup-angular.module 注册 模块 => explames => App 模块注入便可以全局使用 
 * 组件内部使用 => 先引入组件 => 内部使用注册 
 */
import { HomeComponent } from './views/home/home.component';
import { GridComponent } from './views/grid/grid.component';
import { CellComponent } from './views/cell/cell.component';
import { SwitchComponent } from './views/switch/switch.component';
import { DialogComponent } from './views/dialog/dialog.component';
import { AlertComponent } from './views/alert/alert.component';
import { ActionsheetComponent } from './views/actionsheet/actionsheet.component';

import { PopupComponent } from './views/popup/popup.component';
import { FlexboxComponent } from './views/flexbox/flexbox.component';

import { PickerComponent } from './views/picker/picker.component'; 
import { PopupPickerComponent } from './views/popup-picker/popup-picker.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GridComponent,
    CellComponent,
    SwitchComponent,
    DialogComponent,
    AlertComponent,
    ActionsheetComponent,
    PopupComponent,
    FlexboxComponent,
    PickerComponent,
    PopupPickerComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LmModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
