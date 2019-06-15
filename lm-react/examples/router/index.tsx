import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

// 适配器模式（Adapter）:将一个类的接口转换成客户希望的另外一个接口。Adapter 模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。
interface State {
  component: any
}
function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    public state: State = {
      component: null
    }
    constructor(props) {
      super(props)
    }
    async componentDidMount() {
      if (this.state.component) return;
      const { default: component } = await importComponent()
      this.setState({
        component: component
      })
    }
    componentWillUnMount() {
      let { component } = this.state
      if (component) {
        this.setState({
          component: null
        })
      }
    }
    render() {
      const RenderComponet = this.state.component
      return RenderComponet ? <RenderComponet {...this.props} /> : null
    }
  }
  return AsyncComponent
}

let HomePage = asyncComponent(() => import('@examples/views/Home.tsx'))
let DemoPage = asyncComponent(() => import('@examples/views/Demo.tsx'))
let PickerPage = asyncComponent(() => import('@examples/views/Picker.tsx'))
let ActionsheetPage = asyncComponent(() => import('@examples/views/Actionsheet.tsx'))
let PopupPage = asyncComponent(() => import('@examples/views/Popup.tsx'))


export default class LmRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={() => <HomePage></HomePage>} />
          <Route path="/home" component={HomePage} />
          <Route path="/demo" component={DemoPage} />
          <Route path="/picker" component={PickerPage} />
          <Route path="/actionsheet" component={ActionsheetPage} />
          <Route path="/popup" component={PopupPage} />

        </Switch>
      </Router>
    )
  }
}

