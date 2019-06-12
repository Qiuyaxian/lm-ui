import React from 'react';
import ReactDOM from 'react-dom';
import { Alert } from '../../components/alert'
interface AlertProps {
  // 标题
  title: string;
  // 内容
  content: string;
  // 按钮文字
  buttonText?: string;
  // 是否失去标点
  hideOnBlur?: boolean;
  // 遮罩层动画 transition 
  maskTransition?: string;
  // 弹出窗动画
  dialogTransition?: string;
  // 遮罩层 z-index
  maskZIndex?: string | number;
  // 关闭时执行的函数
  onHide?: Function;
  // 弹出层弹出前执行的函数
  onShow?: Function;
};

interface AlertPluginsClass {

}
export default function AlertPlugins(props: AlertProps) {
  const div = document.createElement('div');
  let visible = true
  // 1. 首先判断是否存在 id 为 getUUid 的弹框
  // 存在显示
  // 不存在创建
  // 是否移除弹出框

  const component = React.createElement(Alert, Object.assign(props, {
    visible: true,
    willUnmount: () => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
  }));
  document.body.appendChild(div);
  ReactDOM.render(component, div);
}

