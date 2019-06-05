import { ApplicationRef, ComponentRef, ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { ComponentService } from '../../core';
import { LmActionsheet } from './actionsheet'
// 配置项约束
import { LmActionsheetProps } from './actionsheet.props'
@Injectable({ providedIn: 'root' })
export class LmActionsheetService extends ComponentService {
  constructor(
    resolver: ComponentFactoryResolver,
    applicationRef: ApplicationRef,
    injector: Injector,
    @Inject(DOCUMENT) doc: any,
  ) {
    super(resolver, applicationRef, injector, doc);
  }
  private component: ComponentRef<any>
  // 外部调用方法 => show
  show(data: LmActionsheetProps): Observable<any> {
    const componentRef = this.build(LmActionsheet);
    // 配置数据
    // componentRef.instance.config = data;
    // 注册onHide事件
    componentRef.instance.onAfterHide.subscribe(() => {
      // setTimeout(() => this.destroy(componentRef), 300);
    });
    // 调用内部show 方法
    return componentRef.instance.showHandle(data);
  }
  // 同步 Sync
  showSync(data: LmActionsheetProps): void{
    let component = this.build(LmActionsheet);
    this.component = component;
    component.instance.onAfterShow.subscribe(() => {
      data.onAfterShow && data.onAfterShow();
    });
    component.instance.onAfterHide.subscribe(() => {
      data.onAfterHide && data.onAfterHide();
      // setTimeout(() => this.destroy(component), 300);
    });
    component.instance.showSync(data);
  }
}