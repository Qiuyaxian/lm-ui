import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { BaseService } from '../../core/base.service';
import { Observable } from 'rxjs';
import { VupDialog } from './dialog'
import { DialogProps } from './dialog.props'
@Injectable({ providedIn: 'root' })
export class DialogService extends BaseService {
  constructor(
    resolver: ComponentFactoryResolver,
    applicationRef: ApplicationRef,
    injector: Injector,
    @Inject(DOCUMENT) doc: any,
  ) {
    super(resolver, applicationRef, injector, doc);
  }

  /**
   * 创建一个对话框并显示
   *
   * @param data 对话框配置项
   * @returns 可订阅来获取结果
   */
  show(data: DialogProps): Observable<any> {
    const componentRef = this.build(DialogComponent);

    componentRef.instance.config = data;
    componentRef.instance.close.subscribe(() => {
      setTimeout(() => this.destroy(componentRef), 300);
    });
    return componentRef.instance.show();
  }
}