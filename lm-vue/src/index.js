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
import { Loading } from './components/loading'
// 指令
import { TransferDom } from './directives/transfer-dom'
// 插件
import ActionsheetPlugin from './plugins/actionsheet'
import AddressPlugin from './plugins/address'
import AlertPlugin from './plugins/alert'
import DatetimePlugin from './plugins/datetime'
import ConfirmPlugin from './plugins/confirm'
import ConfigPlugin from './plugins/config'
import ToastPlugin from './plugins/toast'
import LoadingPlugin from './plugins/loading'
import DevicePlugin from './plugins/device'

const components = {
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
};
// 全局注册组件
const install = function (Vue, opts = {}) {
  Object.values(components).map(component => {
    Vue.component(component.name, component);
  });
  // 注册指令
  Vue.directive('transfer-dom', TransferDom);
  // 注册组件
  Vue.prototype.$lm = {
    'actionsheet': ActionsheetPlugin,
    'address': AddressPlugin,
    'alert': AlertPlugin,
    'datetime': DatetimePlugin,
    'confirm': ConfirmPlugin,
    'config': ConfigPlugin,
    'toast': ToastPlugin,
    'loading': LoadingPlugin,
    'device': DevicePlugin
  };
};
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export {
  install,
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
  DatetimeRange,
  TransferDom,
  ActionsheetPlugin,
  AddressPlugin,
  AlertPlugin,
  DatetimePlugin,
  ConfirmPlugin,
  ConfigPlugin,
  ToastPlugin,
  LoadingPlugin,
  DevicePlugin
}
export default install;