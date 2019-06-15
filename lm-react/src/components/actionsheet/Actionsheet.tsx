import React from 'react';
import { Component, View, Transition, ComponentProps, isArray, isObject } from '@src/core';
import { Mask } from '../mask';
import { ActionsheetComponentProps, ActionsheetState } from './PropsType'
interface ActionsheetProps extends ActionsheetComponentProps {
  value: boolean
}
export class Actionsheet extends Component<ActionsheetProps, ActionsheetState> {
  state: ActionsheetState = {
    show: false
  }

  static defaultProps: ActionsheetProps = {
    value: false,
    theme: 'ios',
    menus: [],
    maskTransition: 'lm-actionsheet-mask',
    closeOnClickingMask: true,
    closeOnClickingMenu: true
  }

  constructor(props: ActionsheetProps) {
    super(props);

  }
  componentDidMount() {
    let { value } = this.props;
    this.setState({
      show: value || false
    });
  }
  componentWillReceiveProps(nextProps: ActionsheetProps) {
    let { value } = nextProps;
    if (value) {
      this.setState({
        show: value
      })
    }
  }
  onMenuClick(text, key) {
    if (typeof text === 'string') {
      // this.emitEvent('on-click-menu', key, text)
      this.menuHandle(key, text)
    } else {
      if (text.type && (text.type !== 'disabled' && text.type !== 'info')) {
        if (text.value || text.value === 0) {
          this.menuHandle(text.value, text)
        } else {
          this.menuHandle('', text)
        }
      }
    }
    // this.$emit(event, menu, _item)
  }
  menuHandle(item: any, key?: string): void {
    let _item = item;
    let { closeOnClickingMenu, onClickMenu } = this.props
    if (typeof _item === 'object') {
      _item = JSON.parse(JSON.stringify(_item))
    }
    onClickMenu && onClickMenu(_item, key);
    closeOnClickingMenu && this.setState({
      show: false
    })
  }
  // 是否点击遮罩层关闭
  onMaskClick() {
    console.log('onMaskClick')
    let { closeOnClickingMask, onClickMask } = this.props;
    onClickMask && onClickMask();
    closeOnClickingMask && this.setState({
      show: false
    })
  }

  render() {
    let { value, theme, showCancel, cancelText, maskTransition, onHide, maskZIndex, menus, headerSlot } = this.props;
    let { show } = this.state
    return (
      <div className="lm-actionsheet-wrapper">
        <Mask maskZIndex={maskZIndex}
          onMaskClick={() => this.onMaskClick()}
          maskTransition={maskTransition}
          onHide={() => this.props.onHide && this.props.onHide()}
          show={show}>
        </Mask>
        <div className={this.className({
          'lm-skin_android': theme === 'android'
        })}>
          <Transition
            onAfterEnter={() => this.props.onAfterEnter && this.props.onAfterEnter()}
            onAfterLeave={() => this.props.onAfterLeave && this.props.onAfterLeave()}
            name={theme === 'android' ? 'lm-android-actionsheet' : 'lm-ios-actionsheet'}>
            <View show={show}>
              {
                (theme === 'android') ? (
                  <div className="lm-actionsheet">
                    <div className="lm-actionsheet-menu">
                      {
                        isArray(menus) ? (
                          menus && (menus as any).map((item, index) => {
                            return (
                              <div key={index} className="lm-actionsheet-cell"
                                onClick={() => this.onMenuClick(item, index)}>{item.label || item}</div>
                            )
                          })
                        ) : (
                            Object.keys(menus).map((item, index) => {
                              return (
                                <div
                                  key={item}
                                  className="lm-actionsheet-cell"
                                  onClick={() => this.onMenuClick(menus[item], item)}>{menus[item].label || menus[item]}</div>
                              )
                            })
                          )
                      }

                    </div>
                  </div>
                ) : (
                    <div className={this.className('lm-actionsheet lm-ios-actionsheet')}
                      ref="iOSMenu">
                      <div className="lm-actionsheet-menu">
                        {
                          headerSlot ? (
                            { headerSlot }
                          ) : (null)
                        }
                        {
                          isArray(menus) ? (
                            menus && (menus as any).map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  data-key={index}
                                  className={this.className('lm-actionsheet-cell', `lm-actionsheet-menu-${item.type || 'default'}`)}
                                  onClick={() => this.onMenuClick(item, index)}>
                                  {item.label || item}
                                </div>
                              )
                            })
                          ) : (
                              Object.keys(menus).map((item, index) => {
                                return (
                                  <div
                                    key={item}
                                    data-key={item}
                                    className={this.className('lm-actionsheet-cell', `lm-actionsheet-menu-${menus[item].type || 'default'}`)}
                                    onClick={() => this.onMenuClick(menus[item], item)}>
                                    {menus[item].label || menus[item]}
                                  </div>
                                )
                              })
                            )

                        }
                      </div>
                      {
                        showCancel ? (
                          <div className="lm-actionsheet-action"
                            onClick={() => this.menuHandle('cancel')}
                          >
                            <div className="lm-actionsheet-cell">{cancelText || '取消'}</div>
                          </div>
                        ) : (null)
                      }
                    </div>
                  )
              }
            </View>
          </Transition>
        </div>
      </div>
    );
  };
};

