import Vue from 'vue'
import { Template } from './components/template'
import { Navbar } from './components/navbar'
import { Grid, GridItem } from './components/grid'
import { Button } from './components/button'
import { Group, GroupTitle } from './components/group'
import { Cell, CellPreview } from './components/cell'
import { Badge } from './components/badge'
import { Tab, TabItem } from './components/tab'
import { Toast } from './components/toast'
import { Switch } from './components/switch'
import { Flexbox, FlexboxItem } from './components/flexbox'
import { Divider } from './components/divider'
import { Marquee, MarqueeItem } from './components/marquee'
import { CountUp, CountDown } from './components/count'
import { Panel, PanelItem } from './components/panel'
import { Textarea } from './components/textarea'
import { Form, FormItem, FormPreview } from './components/form'
import { Rater } from './components/rater'
import { Search } from './components/search'
import { Spinner } from './components/spinner'
import { Tabbar, TabbarItem } from './components/tabbar'
import { Clock } from './components/clock'
import { Dialog } from './components/dialog'
import { Confirm } from './components/confirm'
import { Alert } from './components/alert'
import { Actionsheet } from './components/actionsheet'
import { Icon } from './components/icon'
import { Scroll } from './components/scroll'
import { Picker } from './components/picker'
import { Popup } from './components/popup'
import { PopupHeader } from './components/popup-header'
import { PopupPicker } from './components/popup-picker'
import { Address } from './components/address'
import { Datetime } from './components/datetime'
import { DatetimeRange } from './components/datetime-range'
//指令
import { DatetimeRange } from './components/datetime-range'
import { TransferDom } from './directives/transfer-dom'
const components = [
  Template,
  Navbar,
  Grid,
  GridItem,
  Button,
  Group,
  GroupTitle,
  Cell,
  CellPreview,
  Badge,
  Tab,
  TabItem,
  Toast,
  Switch,
  Flexbox,
  FlexboxItem,
  Divider,
  Marquee,
  MarqueeItem,
  CountUp,
  CountDown,
  Panel,
  PanelItem,
  Textarea,
  Form,
  FormItem,
  FormPreview,
  Rater,
  Search,
  Spinner,
  Tabbar,
  TabbarItem,
  Clock,
  Dialog,
  Confirm,
  Alert,
  Actionsheet,
  Icon,
  Scroll,
  Picker,
  Popup,
  PopupHeader,
  PopupPicker,
  Address,
  Datetime,
  DatetimeRange
];
// 注册组件
const install = function (Vue, opts = {}) {
  components.map(component => {
    let componentName
    if (/template|button|switch|marquee|textarea|form|dialog|confirm|alert|address/i.test(component.name)) {
      componentName = component.name
    } else {
      componentName = `lm-${component.name}`
    }
    Vue.component(componentName, component);
  });
  // Vue.directive('transfer-dom', TransferDom);
  // 注册组件
  // Vue.prototype.$vup = {
  //   'alert': AlertPlugin
  // };
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  ...components,
  TransferDom,
  install
}