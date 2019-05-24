import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';

// 注入模块
import { VupModule } from '../../src/components/vup-angular.module';
import { ExamplesSharedModule } from './shared/module'

/**
 * 开发流程 先定义组件文件 => 在components 下的 vup-angular.module 注册 模块 => explames => App 模块注入便可以全局使用 
 * 组件内部使用 => 先引入组件 => 内部使用注册 
 */


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    VupModule.forRoot(),
    ExamplesSharedModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
