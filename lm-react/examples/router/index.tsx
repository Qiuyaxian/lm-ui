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
let HeaderPage = asyncComponent(() => import('@examples/views/Header.tsx'))
let AlertPage = asyncComponent(() => import('@examples/views/Alert.tsx'))
let PickerPage = asyncComponent(() => import('@examples/views/Picker.tsx'))
let ActionsheetPage = asyncComponent(() => import('@examples/views/Actionsheet.tsx'))
let PopupPage = asyncComponent(() => import('@examples/views/Popup.tsx'))
let CellPage = asyncComponent(() => import('@examples/views/Cell.tsx'))
let DialogPage = asyncComponent(() => import('@examples/views/Dialog.tsx'))
let GridPage = asyncComponent(() => import('@examples/views/Grid.tsx'))
let FlexboxPage = asyncComponent(() => import('@examples/views/Flexbox.tsx'))
let SwitchPage = asyncComponent(() => import('@examples/views/Switch.tsx'))
let PopupPickerPage = asyncComponent(() => import('@examples/views/PopupPicker.tsx'))
let AddressPage = asyncComponent(() => import('@examples/views/Address.tsx'))


export default class LmRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={() => <HomePage></HomePage>} />
          <Route path="/home" component={HomePage} />
          <Route path="/Header" component={HeaderPage} />
          <Route path="/Alert" component={AlertPage} />
          <Route path="/cell" component={CellPage} />
          <Route path="/grid" component={GridPage} />
          <Route path="/dialog" component={DialogPage} />
          <Route path="/flexbox" component={FlexboxPage} />
          <Route path="/switch" component={SwitchPage} />
          <Route path="/picker" component={PickerPage} />
          <Route path="/popup-picker" component={PopupPickerPage} />
          <Route path="/address" component={AddressPage} />
          <Route path="/actionsheet" component={ActionsheetPage} />
          <Route path="/popup" component={PopupPage} />
        </Switch>
      </Router>
    )
  }
}

