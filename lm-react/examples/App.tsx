import React from 'react';
import ReactDom from 'react-dom';
import { TransferDom, Dialog, Alert } from '../src/index'
import { privateName } from '@babel/types';

//初始化页面

interface State {
  flag: boolean
}
class App extends React.Component {
  state: State = {
    flag: true
  }
  constructor(props) {
    super(props);
    console.log('dsfsdf')
  }

  private clickHandle() {
    let { flag } = this.state;
    this.setState({ flag: !flag });
  }
  private hideHandle() {
    console.log('hideHandle');
    this.setState({
      flag: false
    });
  }
  private showHandle() {
    console.log('showHandle App.js');
  }
  // componentWillMount调用之后， componentDidMount调用之前。
  render() {
    let text, { flag } = this.state;
    let button = {
      'width': '100px',
      'height': '100px',
      'background': 'red',
      'lineHeight': '100px'
    }
    if (flag) {
      text = '风格1';
    } else {
      text = '风格2';
    }
    return (
      <div>
        <TransferDom v-transfer-dom="true">
          <Alert
            title={'唐初'}
            content={'尝试'}
            visible={flag}
            onShow={() => this.showHandle()}
            onHide={() => this.hideHandle()}>
          </Alert>
        </TransferDom>
        <div onClick={this.clickHandle.bind(this)} style={button}>点击</div>
        <div>{text}</div>
      </div>
    );
  }
}
export default App;