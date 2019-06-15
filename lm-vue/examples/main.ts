// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 路由
import router from './router';
// 使用注册
// import lm from '../src';
// Vue.use(lm);
// 按需引入组件
import {
  Page,
  Header,
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
} from '../src/index'
Vue.component('lm-page', Page);
Vue.component('lm-header', Header);
Vue.component('lm-grid', Grid);
Vue.component('lm-grid-item', GridItem);
Vue.component('lm-button', Button);
Vue.component('lm-group', Group);
Vue.component('lm-group-title', GroupTitle);
Vue.component('lm-cell', Cell);
Vue.component('lm-cell-preview', CellPreview);
Vue.component('lm-badge', Badge);
Vue.component('lm-tab', Tab);
Vue.component('lm-tab-item', TabItem);
Vue.component('lm-toast', Toast);
Vue.component('lm-switch', Switch);
Vue.component('lm-flexbox', Flexbox);
Vue.component('lm-flexbox-item', FlexboxItem);
Vue.component('lm-divider', Divider);
Vue.component('lm-marquee', Marquee);
Vue.component('lm-marquee-item', MarqueeItem);
Vue.component('lm-count-up', CountUp);
Vue.component('lm-count-down', CountDown);
Vue.component('lm-panel', Panel);
Vue.component('lm-panel-item', PanelItem);
Vue.component('lm-textarea', Textarea);
Vue.component('lm-form', Form);
Vue.component('lm-form-item', FormItem);
Vue.component('lm-form-preview', FormPreview);
Vue.component('lm-rater', Rater);
Vue.component('lm-search', Search);
Vue.component('lm-spinner', Spinner);
Vue.component('lm-tabbar', Tabbar);
Vue.component('lm-tabbar-item', TabbarItem);
Vue.component('lm-clock', Clock);
Vue.component('lm-dialog', Dialog);
Vue.component('lm-confirm', Confirm);
Vue.component('lm-alert', Alert);
Vue.component('lm-actionsheet', Actionsheet);
Vue.component('lm-icon', Icon);
Vue.component('lm-scroll', Scroll);
Vue.component('lm-picker', Picker);
Vue.component('lm-popup', Popup);
Vue.component('lm-popup-header', PopupHeader);
Vue.component('lm-popup-picker', PopupPicker);
Vue.component('lm-address', Address);
Vue.component('lm-datetime', Datetime);
Vue.component('lm-datetime-range', DatetimeRange);
// 使用指令
Vue.directive('transfer-dom', TransferDom);
// 使用插件
Vue.use(ActionsheetPlugin);
Vue.use(AddressPlugin);
Vue.use(AlertPlugin);
Vue.use(DatetimePlugin);
Vue.use(ConfirmPlugin);
Vue.use(ConfigPlugin);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(DevicePlugin);
// vuex
// import store from '@/vuex'

Vue.config.productionTip = false

Vue.config.errorHandler = (err, vm, info) => {
  console.log(err, 'err');
}
/* eslint-disable no-new */
const init = new Vue({
  el: '#app',
  render: h => h(App),
  router
})
