import React from 'react';
//初始化页面
import LmRouter from './router'

class App extends React.Component {
  // componentWillMount调用之后， componentDidMount调用之前。

  render() {

    return (
      <LmRouter></LmRouter>
    );
  }
}
export default App;