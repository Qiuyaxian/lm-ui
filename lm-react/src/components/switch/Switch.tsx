import React from 'react';
import { Component, ComponentProps, pxTorem, cleanStyle, isEqual } from '@src/core';
import { Header } from '../header/index';
import { InlineDesc } from '../inline-desc'

interface ParentProps {
  borderIntent?: boolean
  cellWidth?: string
  showBorders?: boolean
  labelWidth?: string
  labelAlign?: string
}

interface SwitchProps extends ComponentProps {
  switchLabel?: any
  disabled?: boolean
  value: boolean | string | number
  inlineDesc?: any
  preventDefault?: boolean
  valueMap?: any[]
  parent?: ParentProps
  onChange?: Function
  input?: Function
};

interface State {
  currentValue: boolean
}

export default class Switch extends Component<SwitchProps, any> {

  wrap: any
  state: State = {
    currentValue: false
  }

  static defaultProps: SwitchProps = {
    value: false,
    valueMap: [false, true]
  }

  constructor(props: SwitchProps) {
    super(props);
    this.state = {
      currentValue: this.toBoolean(props.value ? props.value : false)
    }
  }
  toBoolean(val) {
    let { valueMap } = this.props
    if (!valueMap) {
      return val
    } else {
      const index = valueMap.indexOf(val)
      return index === 1
    }
  }
  toRaw(val) {
    let { valueMap } = this.props
    if (!valueMap) {
      return val
    } else {
      return valueMap[val ? 1 : 0]
    }
  }
  componentWillReceiveProps(nextProps: SwitchProps) {

    let { value } = nextProps;
    let { currentValue } = this.state
    if (!isEqual(value, currentValue)) {
      this.setState({
        currentValue: this.toBoolean(value)
      });
    }
  }
  get labelStyle() {
    let { switchLabel, parent } = this.props;
    let { labelWidth, labelAlign } = parent;
    let isHTML = /<\/?[^>]*>/.test(switchLabel);
    let width = Math.min(isHTML ? 5 : (switchLabel && switchLabel.length + 1), 14) + 'em'
    return cleanStyle({
      display: 'block',
      width: labelWidth || width,
      textAlign: labelAlign
    })
  }
  get labelClass() {
    let { parent } = this.props;
    let { labelAlign } = parent
    return {
      'lm-cell-justify': labelAlign === 'justify'
    }
  }
  handleInputChange(event: any) {
    // 获取绑定的枚举值
    const checked = this.toRaw(event.target.checked);
    let { input, onChange } = this.props;
    this.setState({
      currentValue: checked
    });
    input && input(checked);
    onChange && onChange(checked);
  }

  render() {
    const {
      switchLabel,
      disabled,
      value,
      inlineDesc,
      preventDefault,
      valueMap
    } = this.props;
    let labelStyle = this.labelStyle;
    let labelClass = this.labelClass;

    let { currentValue } = this.state;

    return (
      <div className={this.className('lm-switch-wrapper lm-cell lm-cell-switch')}>
        <div className={this.className('lm-cell-bd')}>
          <label className={this.className('lm-label', labelClass)}
            style={this.style(labelStyle)}>{switchLabel}</label>
          {
            inlineDesc ? (<InlineDesc>{inlineDesc}</InlineDesc>) : (null)
          }
        </div>
        <div className={this.className('lm-cell-switch-body')}>
          <input
            className="lm-switch"
            type="checkbox"
            disabled={disabled}
            checked={currentValue}
            onChange={(e) => this.handleInputChange(e)}
          />

          {
            preventDefault ? (<div className="lm-switch-overlay"></div>) : (null)
          }
        </div>
      </div>
    );
  };
};

