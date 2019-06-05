import { ApplicationRef, ComponentRef, ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { ComponentService } from '../../utils';
import { LmAlert } from './alert'
// 配置项约束
import { LmAlertProps } from './alert.props'
@Injectable({ providedIn: 'root' })
export class LmAlertService extends ComponentService {
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
  public show(data: LmAlertProps): Observable<any> {
    const componentRef = this.build(LmAlert);
    // 配置数据
    // componentRef.instance.config = data;
    // 注册onHide事件
    componentRef.instance.onHide.subscribe(() => {
      setTimeout(() => this.destroy(componentRef), 300);
    });
    // 调用内部show 方法
    return componentRef.instance.showHandle(data);
  }
 
  // 同步 Sync
  public showSync(data: LmAlertProps): void{
    let component = this.build(LmAlert);
    this.component = component;
    component.instance.onShow.subscribe(() => {
      data.onShow && data.onShow();
    });
    component.instance.onHide.subscribe(() => {
      data.onHide && data.onHide();
      setTimeout(() => this.destroy(component), 300);
    });
    component.instance.showSync(data);
  }

}