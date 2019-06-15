import React from 'react';
import ReactDOM from 'react-dom';
import { Actionsheet } from '../../components/actionsheet'
interface ActionsheetProps {
  showCancel?: boolean
  cancelText?: string
  theme?: string
  menus: object | any[]
  closeOnClickingMask?: boolean
  closeOnClickingMenu?: boolean
  headerSlot?: any
  maskZIndex?: number
  onClickMask?: Function
  onHide?: Function
  onClickMenu?: Function
  maskTransition?: string
  onAfterEnter?: Function
  onAfterLeave?: Function
};


export default function ActionsheetPlugins(props: ActionsheetProps) {
  const div = document.createElement('div');
  let visible = true

  const component = React.createElement(Actionsheet, Object.assign(props, {
    value: true,
    onAfterLeave: () => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
  }));
  document.body.appendChild(div);
  ReactDOM.render(component, div);
}

