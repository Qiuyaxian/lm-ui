import React from 'react';
import { Component, View, Transition, ComponentProps, copy, isEqual } from '@src/core';
import { PopupHeader } from '../popup-header'
import { Popup } from '../popup'
import { Picker } from '../picker'
import { Cell } from '../cell'
import { value2name, array2string, name2value } from '../../filters'
import { TransferDom } from '../../directives';

import { PopupPickerComponentProps, PopupPickerState } from './PropsType'
interface PopupPickerProps extends PopupPickerComponentProps {
  show: boolean
};

export default class PopupPicker extends Component<PopupPickerProps, PopupPickerState> {

  state: PopupPickerState = {
    onShowProcess: false,
    tempValue: [],
    closeType: false,
    currentData: [], // used for detecting if it is after data change
    showValue: false,
    currentValue: []
  }

  static defaultProps: PopupPickerProps = {
    value: [],
    label: '请选择',
    cancelText: '取消',
    confirmText: '确定',
    data: [],
    placeholder: '请选择',
    columns: 0,
    fixedColumns: 3,
    show: false,
    isTransferDom: true,
    columnWidth: [],
    disabled: false,
    borderIntent: false
  }

  constructor(props: PopupPickerProps) {
    super(props);
  }

  componentDidMount() {
    let { data, value: newValue, show } = this.props;
    let { currentValue: oldValue, showValue } = this.state
    if (!isEqual(newValue, oldValue)) {
      this.setState({
        currentData: JSON.stringify(data),
        tempValue: copy(newValue),
        currentValue: newValue,
        showValue: show
      }, () => {
        this.props.onChange && this.props.onChange(newValue);
      })
    }
  }

  componentWillReceiveProps(nextProps: PopupPickerProps) {
    let { value: newValue, show } = nextProps;
    let { currentValue: oldValue, showValue } = this.state
    if (!isEqual(newValue, oldValue)) {
      this.setState({
        currentValue: newValue,
        tempValue: copy(newValue)
      }, () => {
        this.props.onChange && this.props.onChange(newValue);
      });
    }
    if (!isEqual(show, showValue)) {
      this.setState({
        showValue: show
      });
    }
  }

  private value2nameFilter(value: any[], list: any[], delimiter?: string): any[] {
    return value2name(value, list, delimiter)
  }

  private array2stringFilter(array: any[]): any[] {
    return array2string(array)
  }

  private name2valueFilter(name: any, list: any[]): any[] {
    return name2value(name, list)
  }
  /**
   * [onClick 点击打开弹出层]
  * @return {[type]} [description]
  */
  private onClick() {
    let { disabled, value } = this.props;
    if (!disabled) {
      this.setState({
        showValue: true
      });
    }
  }
  /**
   * [onHide 弹出层关闭]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  private onHide(type) {
    let { value } = this.props;
    let { tempValue, currentValue } = this.state;
    if (type) {
      this.setState({
        showValue: false,
        closeType: true,
        currentValue: copy(tempValue)
      }, () => {
        this.props.onChange && this.props.onChange(copy(tempValue));
      })
    }
    if (!type) {
      this.setState({
        showValue: false,
        closeType: false
      })
      if (value.length > 0) {
        this.setState({
          tempValue: copy(currentValue)
        });
      }
    }
  }
  /**
   * [onPopupShow 弹出层显示]
   * @return {[type]} [description]
   */
  private onPopupShow(): void {
    this.setState({
      closeType: false
    });
    this.props.onShow && this.props.onShow();
  }
  /**
   * [onPopupHide 弹出层隐藏]
   * @param  {[type]}     [description]
   * @return {[type]}     [description]
   */
  private onPopupHide(): void {
    let { value } = this.props;
    let { currentValue } = this.state;
    if (value.length > 0) {
      this.setState({
        showValue: false,
        tempValue: copy(currentValue)
      })
      this.props.onHide && this.props.onHide();
    }
  }
  /**
   * [onPickerChange 滚动选择时触发]
   * @param  {[type]} val [description]
   * @return {[type]}     [description]
   */
  private onPickerChange(val): void {
    let { currentValue, currentData } = this.state;
    let { value, data } = this.props;
    if (JSON.stringify(currentValue) !== JSON.stringify(val)) {
      // if has value, replace it
      if (value.length) {
        let nowData: any = JSON.stringify(data)
        if (nowData !== currentData && (currentData as any) !== '[]') {
          this.setState({
            tempValue: copy(val)
          })
        }
        this.setState({
          currentData: nowData
        })
      } else { // if no value, stay quiet
        // if set to auto update, do update the value
      }
    }
    const _val = copy(val);
    this.props.onShadowChange && this.props.onShadowChange(_val, value2name(_val, data).split(' '));
  }
  private updateModel(value): void {
    this.setState({
      tempValue: value
    })
  }

  render() {
    let {
      data,
      value,
      columns,
      fixedColumns,
      columnWidth,
      cancelText,
      confirmText,
      popupTitle,
      inlineDesc,
      label,
      valueTextAlign,
      showName,
      parent,
      displayFormat, placeholder, borderIntent } = this.props;
    let { currentValue, tempValue, showValue } = this.state;
    return (
      <div className="lm-popup-picker-wrapper">
        <Cell
          parent={parent}
          onCellClick={() => this.onClick()}
          borderIntent={borderIntent}
          label={label}
          inlineDesc={inlineDesc} content={this.array2stringFilter(currentValue)}
        >
          <div className="lm-popup-picker-select" style={this.style({
            'textAlign': valueTextAlign
          })}>
            {
              (!displayFormat && !showName && currentValue && currentValue.length) ? (
                <span className="lm-popup-picker-value lm-cell-value">
                  {this.array2stringFilter(currentValue)}
                </span>
              ) : (null)
            }
            {
              (!displayFormat && showName && currentValue && currentValue.length) ? (
                <span className="lm-popup-picker-value lm-cell-value">
                  {this.value2nameFilter(currentValue, data)}
                </span>
              ) : (null)
            }
            {
              (displayFormat && currentValue && currentValue.length) ? (
                <span className="lm-popup-picker-value lm-cell-value">
                  {displayFormat(currentValue, value2name(currentValue, data))}
                </span>
              ) : (null)
            }
            {
              (currentValue && !currentValue.length && placeholder) ? (
                <span className="lm-popup-picker-placeholder lm-cell-placeholder">
                  {placeholder}
                </span>
              ) : (null)
            }
          </div>
        </Cell>
        <TransferDom>
          <Popup
            value={showValue}
            className="lm-popup-picker"
            onHide={() => this.onPopupHide()}
            onShow={() => this.onPopupShow()}
          >
            <div className="lm-popup-picker-container">
              <PopupHeader
                leftText={cancelText}
                rightText={confirmText}
                title={popupTitle}
                onClickLeft={() => this.onHide(false)}
                onClickRight={() => this.onHide(true)}
              ></PopupHeader>
              <Picker
                stop={showValue}
                data={data}
                model={tempValue}
                updateModel={(val) => this.updateModel(val)}
                onChange={(val) => this.onPickerChange(val)}
                columns={columns}
                fixedColumns={fixedColumns}
                columnWidth={columnWidth}
              ></Picker>
            </div>
          </Popup>
        </TransferDom>
      </div>
    );
  };
};