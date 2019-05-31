# vup-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
环境搭建（以为iview为例）(与src同级的types存放的是typescript项目)
1.配置eslint
2.搭建支持typescript编译环境
3.

package.json解析
{
  "main": "lib/element-ui.common.js", => 指向常用vue组件，发布线上后直接调用使用
  "files": [
    "lib",
    "src",
    "packages",
    "types"
  ], => 指向组件存放文件夹
  "typings": "types/index.d.ts", => 指明typescript组件存放地点，发布线上后直接调用使用
  scripts: {

  }  => doc运行命令配置
  "style": "lib/theme-chalk/index.css", => 指明css位置
}

"env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": ["transform-vue-jsx", "transform-es2015-modules-commonjs", "dynamic-import-node"]
    }
  },

vue+typesript 实践
预先写好vue组件
后面采取typescript对其进行定义扩展

vue手脚架没有的配置项目
1. karma 单元测试 mocha
2. gulp 打包压缩
3. typescript
4. vue-html-loader




适配 => https://www.jianshu.com/p/8b85e49599af

vue前端权限 => https://www.jianshu.com/p/508a2d4cb143

react实现菜单权限控制 => https://segmentfault.com/a/1190000009509150

共有的文件夹
|--examples
|--src
  |--components
  |  |--组件名
  |  |  |-- 组件名.vue 组件名.ts(tsx) 组件名.jsx
  |  |  |-- 组件名.props.js 组件名.props.ts 组件名.props.jsx
  |  |  |-- index.js(index.ts)
  |  |
  |--theme
  |  |-- index.scss
  |  |
  |--icons => 存放iconfont 文件
  |--utils(或者改名为core) => 各种基础的js代码文件
  |  |-- index.js 
typings => 支持typings 


vue
|--vuex => 状态管理
|--directives
|--filters
|--plugins
|--mixins
|

import Actionsheet from './components/actionsheet/index.js'
import Address from './components/address/index.js'
import Alert from './components/alert/index.js'
import Button from './components/button/index.js'
import Button from './components/badge/index.js'
import Confirm from './components/confirm/index.js'
import Cell from './components/cell/index.js'
import Clock from './components/clock/index.js'
import CountUp from './components/count-up/index.js'
import CountDown from './components/count-down/index.js'
import CellPreview from './components/cell-preview/index.js'
import DatetimeRange from './components/datetime-range/index.js'
import Datetime from './components/datetime/index.js'
import Dialog from './components/dialog/index.js'
import Divider from './components/divider/index.js'
import Form from './components/form/index.js'
import FormItem from './components/form-item/index.js'
import Flexbox from './components/flexbox/index.js'
import FlexboxItem from './components/flexbox-item/index.js'
import FormPreview from './components/form-preview/index.js'
import Grid from './components/grid/index.js'
import GridItem from './components/grid-item/index.js'
import Group from './components/group/index.js'
import GroupTitle from './components/group-title/index.js'
import Header from './components/header/index.js'
import Icon from './components/icon/index.js'
import InlineDesc from './components/inline-desc/index.js'
import Loading from './components/loading/index.js'
import Marquee from './components/marquee/index.js'
import MarqueeItem from './components/marquee-item/index.js'
import Page from './components/page/index.js'
import Popup from './components/popup/index.js'
import PopupHeader from './components/popup-header/index.js'
import PopupPicker from './components/popup-picker/index.js'
import Picker from './components/picker/index.js'
import Panel from './components/panel/index.js'
import PanelItem from './components/panel-item/index.js'
import Rater from './components/rater/index.js'
import Scroll from './components/scroll/index.js'
import Spinner from './components/spinner/index.js'
import Search from './components/search/index.js'
import Switch from './components/switch/index.js'
import Textarea from './components/textarea/index.js'
import Toast from './components/toast/index.js'
import Tab from './components/tab/index.js'
import TabItem from './components/tab-item/index.js'
import Tabbar from './components/tabbar/index.js'
import TabbarItem from './components/tabbar-item/index.js'
|
|
|  

angular => https://www.jianshu.com/p/f0f81a63cbcb => https://blog.csdn.net/yjw123456/article/details/81170903 => 参考 https://github.com/NG-ZORRO/ng-zorro-antd => https://ng.ant.design/components/auto-complete/zh
Angular 中的服务 => 定义公共的方法，使得方法在组件之间共享调用
插件参考： https://github.com/1CSH1/james-blog-ui/tree/7d2a64c3bc97d33e1b696019536f7627bcc3f3c4
         https://segmentfault.com/a/1190000011388576

better-scroll => http://blog.sina.com.cn/s/blog_14b2f3e150102ycrv.html

https://blog.csdn.net/qq_34551390/article/details/78270869
angular使用class-interface获取父组件和祖先组件 => https://blog.csdn.net/zgrbsbf/article/details/81911917
|--NgRx => 状态管理
|--directives => 对应 vue 的directives => https://www.cnblogs.com/zzy-run-92/p/9400308.html
|--管道(pip)  => pipe，以前叫filter 对应 vue的filters (管道(pipe)是用来对输入的数据进行处理，如大小写转换、数值和日期格式化等)
|--mixins => 基于Serviceser实现 依赖注入解决(局部注册)
|--plugins => 基于Serviceser实现 依赖注入解决(全局注册) => https://blog.csdn.net/sinat_17775997/article/details/81462750
|
|
|开发方式
| 在module.ts 中定义 组件名称,对外名称, 注册依赖(imports)=>在compents文件到constructor方法便可以直接注册使用, 组件入口(entryComponents), 最后到处整个模块
|
|@Injectable => 表面是一个服务，需要依赖注入 => @Injectable('参数') 代表注册到那里

在整个模块里面可以添加是否自动添加全局注入 如=> https://github.com/ElemeFE/element-angular/blob/master/src/message/module.ts 
|
|element 框架中 server => 是作为js(类似vue的plugins)方法的调用 => 引入html 模块 => server 类对外提供插件方法调用 => 也可以继续引入其他server(类似vue的utils)
|
|              module => html 节点调用
| 
|
|
|resolveComponentFactory => 相当于vue.extend() => 产生html => 后续调用appendChild => 插入到body中
|
|elememt => components => shared 文件夹作用 => 相当于utils 
|在 element-angular.module.ts => 注入ElSharedModule |提供给外部使用该方法
|提供的模块使用的是 ant-design 的做法，对外不提供for方法
|同时提供对外按需注册组件的方法，包括一些插件 => https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/alert/nz-alert.module.ts
| ng-zorro-antd => addon => 存放的是指令
| nzStringTemplateOutlet => 使用类似include template 模版技术 
  ng-zorro-antd => update-host-class.service.ts服务 => 提供dom操作(作用是vue的utils)
  update-host-class.service.ts

双响绑定 ngx => rating组件

使用 ng-container 与 ng-template 实现vue 的slot 
浏览器typesctipt @angular/platform-browser  => SafeStyle 
利用K extends keyof WindowEventMap将参数type:K限制在WindowEventMap的键值列表，listener中的参数ev限定为WindowEventMap对应K相应的值



不存在指令，过滤器，minixs
https://www.cnblogs.com/usebtf/p/10176719.html
react => https://github.com/ElemeFE/element-react
react-router => https://blog.csdn.net/Canton_jack/article/details/87167958

类似vue的keep-alive => https://github.com/rt2zz/redux-persist => https://zhuanlan.zhihu.com/p/26308250

https://www.jianshu.com/p/4780d82e874a
中文文档 => https://react.docschina.org/docs/react-api.html

|--redux => 状态管理
|--directives => 
|--filters => 依靠类的继承实现 => https://segmentfault.com/q/1010000014019313 => 你可以写一个函数代替呀。vue中管道也相当于函数。 => https://blog.csdn.net/zhouziyu2011/article/details/70767636 => https://blog.csdn.net/qq_39840470/article/details/86548195 => https://blog.csdn.net/qq_43258252/article/details/87934282
|
|--mixins => 依靠类的继承实现 => 写一个合并操作函数返回一个component
|--plugins => 依靠类的继承实现 => http://yj1438.github.io/2016/10/03/react_alert.html => window 上挂载  => https://github.com/clancysong/react-components => http://aisensiy.github.io/2017/12/21/global-var-in-react/ => https://segmentfault.com/q/1010000009252938
|
|
|
|
|
|



