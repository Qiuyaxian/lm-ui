import Vue from 'vue'
import Template from './components/template/template'
import Navbar from './components/navbar/navbar'
import { Grid, GridItem } from './components/grid'
import Button from './components/button/button'
import Group from './components/group/group'
import { Cell, CellPreview } from './components/cell'
import Badge from './components/badge/badge'
import { Tab, TabItem } from './components/tab'
import Toast from './components/toast/toast'
import Switch from './components/switch/switch'
import { Flexbox, FlexboxItem } from './components/flexbox'
import Divider from './components/divider/divider'
import { Marquee, MarqueeItem } from './components/marquee'
import { CountUp, CountDown } from './components/count'
import { Panel, PanelItem } from './components/panel'
import Textarea from './components/textarea/textarea'
import { Form, FormItem, FormPreview } from './components/form'
import Rater from './components/rater/rater'
import Search from './components/search/search'
import Spinner from './components/spinner/spinner'
import { Tabbar, TabbarItem } from './components/tabbar'
import Clock from './components/clock/clock'
import Dialog from './components/dialog/dialog'
import Confirm from './components/confirm/confirm'
import Alert from './components/alert/alert'
import Actionsheet from './components/actionsheet/actionsheet'
import Icon from './components/icon/icon'
import Scroll from './components/scroll/scroll'
import Picker from './components/picker/picker'
import Popup from './components/popup/popup'
import popupHeader from './components/popup-header/popup-header'
import popupPicker from './components/popup-picker/popup-picker'
import Address from './components/address/address'
import Datetime from './components/datetime/datetime'
import DatetimeRange from './components/datetime-range/datetime-range'
const components = [
  Template,
  Navbar,
  Grid,
  GridItem,
  Button,
  Group,
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
  popupHeader,
  popupPicker,
  Address,
  Datetime,
  DatetimeRange
]

const install = function (Vue, opts = {}) {
  components.map(component => {
    let componentName
    if (/button|switch|marquee|textarea|form|dialog|confirm|alert|address/i.test(component.name)) {
      componentName = component.name
    } else {
      componentName = `vup-${component.name}`
    }
    Vue.component(componentName, component);
  });
}
// 注册组件
install(Vue);