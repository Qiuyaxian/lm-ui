import { DOCUMENT } from '@angular/common';
import { 
  ApplicationRef, 
  ComponentFactoryResolver, 
  Inject, 
  Injectable, 
  Injector 
} from '@angular/core';
import { Observable } from 'rxjs';
// 公用函数
import { BaseService } from '../../core/base.service';

// 组件
import { DialogComponent } from './dialog.component'
import { DialogProps } from './dialog.props';

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
    // 设置输入值
    componentRef.instance.config = data;
    // 调用外部关闭方法
    componentRef.instance.emitHide.subscribe(() => {
      setTimeout(() => this.destroy(componentRef), 300);
    });
    // 调用组件内部show方法
    return componentRef.instance.showHandle();
  }
}