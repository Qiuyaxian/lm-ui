var Components = require('../../components.json');
var fs = require('fs');
var render = require('json-templater/string');
var uppercamelcase = require('uppercamelcase');
var path = require('path');
var endOfLine = require('os').EOL;

var OUTPUT_PATH = path.join(__dirname, '../../src/index.js');
var IMPORT_TEMPLATE = 'import {{name}} from \'./components/{{package}}/index.js\';';
var INSTALL_COMPONENT_TEMPLATE = ' {{name}}';
var MAIN_TEMPLATE = `/* Automatically generated by './build/bin/entry.js' */
{{include}}
const components = [
  {{install}}
];

// 指令
import TransferDom from './directives/transfer-dom'
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

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  // 注册指令
  Vue.directive('transfer-dom', TransferDom);
  // 注册组件
  Vue.use(ActionsheetPlugin)
  Vue.use(AddressPlugin)
  Vue.use(AlertPlugin)
  Vue.use(DatetimePlugin)
  Vue.use(ConfirmPlugin)
  Vue.use(ConfigPlugin)
  Vue.use(ToastPlugin)
  Vue.use(LoadingPlugin)
  Vue.use(DevicePlugin)
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  console.log(window, window.Vue)
  install(window.Vue);
}
export {
  {{list}},
  TransferDom,
  ActionsheetPlugin,
  AddressPlugin,
  AlertPlugin,
  DatetimePlugin,
  ConfirmPlugin,
  ConfigPlugin,
  ToastPlugin,
  LoadingPlugin,
  DevicePlugin,
}
export default {
  install,
  {{list}},
  TransferDom,
  ActionsheetPlugin,
  AddressPlugin,
  AlertPlugin,
  DatetimePlugin,
  ConfirmPlugin,
  ConfigPlugin,
  ToastPlugin,
  LoadingPlugin,
  DevicePlugin,
};
`;

// delete Components.font;

var ComponentNames = Object.keys(Components);

var includeComponentTemplate = [];
var installTemplate = [];
var listTemplate = [];

ComponentNames.forEach(name => {
  var componentName = uppercamelcase(name);
  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }));
  // 
  installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
    name: componentName,
    component: name
  }));

  listTemplate.push(` ${componentName}`);
});

var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  list: listTemplate.join(',' + endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:', OUTPUT_PATH);


// import Vue from 'vue'


// // 指令
// import { TransferDom } from './directives/transfer-dom'
// // 插件
// import ActionsheetPlugin from './plugins/actionsheet'
// import AddressPlugin from './plugins/address'
// import AlertPlugin from './plugins/alert'
// import DatetimePlugin from './plugins/datetime'
// import ConfirmPlugin from './plugins/confirm'
// import ConfigPlugin from './plugins/config'
// import ToastPlugin from './plugins/toast'
// import LoadingPlugin from './plugins/loading'
// import DevicePlugin from './plugins/device'

// const components = {
//   Template,
//   Navbar,
//   Grid,
//   GridItem,
//   Button,
//   Group,
//   GroupTitle,
//   Cell,
//   CellPreview,
//   Badge,
//   Tab,
//   TabItem,
//   Toast,
//   Switch,
//   Flexbox,
//   FlexboxItem,
//   Divider,
//   Marquee,
//   MarqueeItem,
//   CountUp,
//   CountDown,
//   Panel,
//   PanelItem,
//   Textarea,
//   Form,
//   FormItem,
//   FormPreview,
//   Rater,
//   Search,
//   Spinner,
//   Tabbar,
//   TabbarItem,
//   Clock,
//   Dialog,
//   Confirm,
//   Alert,
//   Actionsheet,
//   Icon,
//   Scroll,
//   Picker,
//   Popup,
//   PopupHeader,
//   PopupPicker,
//   Address,
//   Datetime,
//   DatetimeRange
// };
// // 全局注册组件
// const install = function (Vue, opts = {}) {
//   Object.values(components).map(component => {
//     Vue.component(component.name, component);
//   });
//   // 注册指令
//   Vue.directive('transfer-dom', TransferDom);
//   // 注册组件
//   Vue.prototype.$lm = {
//     'actionsheet': ActionsheetPlugin,
//     'address': AddressPlugin,
//     'alert': AlertPlugin,
//     'datetime': DatetimePlugin,
//     'confirm': ConfirmPlugin,
//     'config': ConfigPlugin,
//     'toast': ToastPlugin,
//     'loading': LoadingPlugin,
//     'device': DevicePlugin
//   };
// };
// // auto install
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// }
// export {
//   install,
//   Template,
//   Navbar,
//   Grid,
//   GridItem,
//   Button,
//   Group,
//   GroupTitle,
//   Cell,
//   CellPreview,
//   Badge,
//   Tab,
//   TabItem,
//   Toast,
//   Switch,
//   Flexbox,
//   FlexboxItem,
//   Divider,
//   Marquee,
//   MarqueeItem,
//   CountUp,
//   CountDown,
//   Panel,
//   PanelItem,
//   Textarea,
//   Form,
//   FormItem,
//   FormPreview,
//   Rater,
//   Search,
//   Spinner,
//   Tabbar,
//   TabbarItem,
//   Clock,
//   Dialog,
//   Confirm,
//   Alert,
//   Actionsheet,
//   Icon,
//   Scroll,
//   Picker,
//   Popup,
//   PopupHeader,
//   PopupPicker,
//   Address,
//   Datetime,
//   DatetimeRange,
//   TransferDom,
//   ActionsheetPlugin,
//   AddressPlugin,
//   AlertPlugin,
//   DatetimePlugin,
//   ConfirmPlugin,
//   ConfigPlugin,
//   ToastPlugin,
//   LoadingPlugin,
//   DevicePlugin
// }
// export default install;