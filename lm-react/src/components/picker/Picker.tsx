import React from 'react';
import { Component, copy, View, Transition, ComponentProps, isEqual, querySelector, addEventHandle, removeEventHandle } from '@src/core';
import { PickerItem } from './PickerItem'
import { Flexbox } from '../flexbox'
import { PickerComponentProps, PickerState } from './PropsType'

interface PickerProps extends PickerComponentProps {

}

export class Picker extends Component<PickerProps, PickerState> {

  state: PickerState = {
    currentValue: [],
    currentData: []
  }
  // 非影响页面渲染数据
  private oldData: any[] = []
  private uuid: string = ''

  wrap: any

  static defaultProps: PickerProps = {
    data: [],
    model: [],
    columns: 0,
    fixedColumns: 0,
    stop: false
  }

  constructor(props: PickerProps) {
    super(props);
  }
  // 挂载前
  componentWillMount() {
    this.uuid = Math.random().toString(36).substring(3, 8);
    let timer = setTimeout(() => {
      let { model, data } = this.props;
      this.oldData = copy(data)
      this.updateData(data);
      this.updateModel(model);
      if (timer) clearTimeout(timer);
    })
  }

  private updateData(value): void {
    let { columns } = this.props;
    let { model } = this.props;
    let data;
    if (columns !== 0) {
      data = this.dataCheck(model)
    } else {
      if (columns === 0 && value.length > 1) {
        value = [value[0]]
      }
      data = copy(value);
    }
    this.setState({
      currentData: data
    });
  }

  private updateModel(value): void {
    if (value.length) {
      let { columns } = this.props;
      let { currentValue } = this.state;
      if (columns !== 0) {
        if (currentValue.length && value.length < currentValue.length) {
          for (let i = 0; i < currentValue.length; i++) {
            let item = currentValue[i][0].value || currentValue[i][0]
            value[i] = value[i] ? value[i] : item;
          }
        }
      }
      this.setState({
        currentValue: value
      });
    }
  }

  // 挂载后
  componentDidMount() {

  }
  // 更新props => watch 数据变化
  componentWillReceiveProps(nextProps: PickerProps) {
    let { model, data } = nextProps;
    let { currentValue, currentData } = this.state;
    if (!isEqual(model, currentValue)) {
      this.oldData = copy(data)
      this.updateData(data);
      this.updateModel(model);
    }
    if (!isEqual(data, currentData)) {
      this.oldData = copy(data)
      this.updateData(data);
      this.updateModel(model);
    }
  }

  componentWillUpdata(nextProps, nextState) {

  }
  // 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
  componentWillUnmount() {

  }

  private dataCheck(value): any {
    // check is data contains the values
    if (value.length > 0) {
      // 查找是否有绑定值与相等
      const matchCount = (copy(this.oldData) as any).filter((item) => {
        return (copy(value) as any).indexOf(item.value) > -1
      }).length
      if (matchCount < (copy(value) as any).length) {
        value = []
      }
    }
    let datas = [];
    let { fixedColumns, columns } = this.props;
    const max = fixedColumns || columns || 8;

    for (let i = 0; i < max; i++) {
      if (i === 0) {
        // 设置第一列数据,为后面数据提供初始数据
        datas.push(this.getFirstColumn())
      } else {
        // 没有数据时,取得上一级的第一个
        if (!value[i]) {
          if (typeof datas[i - 1][0] === 'undefined') {
            break
          } else {
            // 取得上一个
            const topValue = datas[i - 1][0].value
            datas.push(this.getChildren(topValue))
          }
        } else {
          datas.push(this.getChildren(value[i - 1]))
        }
      }
    }
    const list = datas.filter((item) => {
      return item.length > 0
    })
    return list;
  }

  // 获取当前值
  private getValue(): any[] {
    let { currentValue } = this.state;
    return currentValue ? (currentValue as any[]).filter(item => item) : [];
  }

  // 通过关联的parent遍历获取下一个子项数据
  private getChildren(value: any): any {
    // 通过循环遍历得出与当前相符的数据
    return this.oldData.filter(one => {
      return one.parent === value
    })
  }

  // 获取多列第一个项的数据
  private getFirstColumn(): any {
    return this.oldData.filter(one => {
      return !one.parent || one.parent === 0 || one.parent === '0'
    })
  }

  private onChange(value, row, col): void {
    let { currentValue } = this.state;
    currentValue[row] = value;
    this.setState({
      currentValue: currentValue
    }, () => {
      this.props.updateModel && this.props.updateModel(currentValue);
    })
    this.updateView(row + 1, value);
  }

  private updateView(i, val): void {
    let oldData = this.oldData;
    let { fixedColumns, columns } = this.props;
    let { currentData, currentValue } = this.state
    let res = oldData.filter(item => {
      return item.parent === val
    });

    if (res.length !== 0) {
      currentData[i] = res
      let item = res[0].value || res[0];
      currentValue[i] = item;
      if (fixedColumns || columns) {
        currentValue.length = fixedColumns || columns
        currentData.length = fixedColumns || columns
      }
      this.setState({
        currentValue: currentValue,
        currentData: currentData
      }, () => {
        this.props.updateModel && this.props.updateModel(currentValue);
      })
      this.updateView(i + 1, item);
    } else {
      let _model = this.getValue();
      // 更改父组件绑定数据
      this.props.onChange && this.props.onChange(_model);
    }
  }

  render() {
    const { children, stop } = this.props;
    let { currentData, currentValue } = this.state;

    let uuid = Math.random().toString(36).substring(3, 8);
    return (
      <div className={this.className('lm-picker')}>
        <Flexbox gutter={0}>
          {
            (currentData as any[]).map((item, index) => {
              let value = currentValue[index];
              return (<Flexbox.Item key={index}>
                {
                  (<PickerItem key={uuid} index={index} onChange={(value, row, col) => this.onChange(value, row, col)} value={value} data={item}></PickerItem>)
                }
              </Flexbox.Item>)
            })
          }
        </Flexbox>
      </div>
    );
  };
};

