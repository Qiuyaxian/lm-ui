
## 技术栈

<p>React.x + typescript</p>


## 运行项目

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```

## 关于打包引用

<p>项目暂不支持打包引用，如果想学习如何打包，可以通过下方链接进行学习</p>

<p>
  <a href="https://github.com/Qiuyaxian/webpcak_build">webpcak_build</a>
</p>

## 项目结构规划

``` bash
目录结构划分
|-- build  // webpack打包编译目录
|   |-- build.js  // 项目打包入口文件
|   |-- check-versions.js  // 检查node和npm版本是否符合
|   |-- dev-client.js  // 页面自动刷新
|   |-- dev-server.js  // 启动热加载代理服务器
|   |-- utils.js  // css和style的loader定义
|   |-- webpack.base.conf.js  // 公共打包文件
|   |-- webpack.dev.conf.js  // 本地开发打包文件
|   |-- webpack.prod.conf.js  // 线上环境打包文件
|   |
|   
|-- config           // 项目开发环境配置目录
|   |-- index.js     // 定义环境配置
|   |-- dev.env.js   // 定义各种生产环境变量
|   |-- prod.env.js  // 定义各种上线环境变量
|
|-- src             // 源码目录
|   |   
|   |-- components  // 组件目录
|   |
|   |-- directives  // 自定义指令库
|   |
|   |-- filters     // 自定义过滤器
|   |      
|   |-- plugins     // 自定义插件
|   |
|   |-- core             // 工具目录
|   |   |
|   |   |-- animation   // animation动画效果库（使用的是ReactTransition）
|   |   |
|   |   |-- component   // 基础的React.Component
|   |   |
|   |   |-- props       // UI基础的props类型规定
|   |   |
|   |   |-- transition  // transition 动画并实现事件绑定
|   |   |
|   |   |-- view        // 控制视图显示与隐藏
|   |   |
|   |   |-- utils
|   |       |
|   |       |-- index.tsx     // 主要负责引出文件
|   |       |
|   |       |-- scroller.tsx  // picker滚动选择组件基础库
|   |       |
|   |       |-- dom.tsx       // 常用dom操作函数集合文件
|   |       |
|   |       |-- passive_supported.tsx  // 浏览器addEventListener事件测试
|   |       |
|   |       |-- requestAnimationFrame.tsx // 浏览器requestAnimation动画库
|   |       |
|   |       |-- date.tsx   // 常用时间操作函数集合
|   |       |
|   |       |-- tools.tsx  // 常用辅助类型函数库集合
|   |       |
|   |       |-- device.tsx // 设备类型判断集合
|   |       |
|   |       |-- uuid.tsx     // 动态生成一个随机标签
|   |       |
|   |       |-- event.tsx    // 浏览器事件集合   
|   |       |
|   |       |-- passive_supported.tsx
|   |       | 
|   |       |-- router.tsx   // 常用 js 路由跳转方法集合
|   |   
|   |   
|   |-- vuex          // vuex的状态管理目录
|   |   |
|   |   |-- index.js. // 入口文件
|   |   |
|   |   |-- modules   // 模块集合
|   |   |   | 
|   |   |   |-- system // 系统状态管理
|   |   |
|-- static         // 静态资源文件 (加载一次的css,图片等文件)
|   |-- img        // 网站图片
|   |-- style      // 静态样式文件  
|   |-- plugins    // 插件 
|   |   |
|   |   |-- flexible.min.js // 适配文件  
|   
|-- typings          // typescript支持
|   
|-- examples         // UI库 demo示例
|   
|-- test             // 自动化测试
|   
|-- components.json  // 组件配置 
|
|-- lib              // 打包后的目录
|
|-- .babelrc        // ES6语法编译配置
|-- .editorconfig   // 编辑器配置
|-- .eslintignore   // eslint忽略配置
|-- .eslintrc.js    // eslint规则配置
|-- .gitattributes  // git文件类型配置
|-- .gitignore      // git忽略配置
|-- gitlab-ci.yml   // gitlab运行脚本配置
|-- tslint.json     // tslint配置
|-- tsconfig.json   // typescript配置
|-- favicon.ico     // 网站ico
|-- index.html      // 进入页面
|-- package.json    // 项目配置依赖包文件
|-- README.md       // 项目说明文件
|-- yarn.lock       // yarn 配置

```

## 如何使用在项目中使用

``` bash

import { Alert, TransferDom, AlertPlugins } from '@src/index'

interface GridProps extends ComponentProps {
  match: object
  location: object
  history: object
}
let grids = []
for (let i = 0; i < 9; i++) {
  grids.push({
    'label': 'grid',
    'icon': 'https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg'
  })
}

export default class GridPage extends Component<GridProps, any> {
  constructor(props: GridProps) {
    super(props);
  }
  onChange(event) {
    this.setState({
      value: event
    })
  }

  state = {
    value: false
  }

  render() {
    let leftOptions = {
      showBack: false
    }
    let gridLists = [];
    let gridLists2 = [];
    for (let i = 0; i < grids.length; i++) {
      let { label, icon } = grids[i]
      gridLists.push(<Grid.Item key={i} icon={icon} label={label}></Grid.Item>)
      gridLists2.push(<Grid.Item key={i} label={label} iconSlot={<img src={icon} alt="" />}>
      </Grid.Item>)
    }
    return (
      <Page
        header={<Header leftOptions={leftOptions} className={'lm-header-fixed'}>Grid</Header>}>
        <Scroll>
          <Grid>
            {gridLists}
          </Grid>
          <Grid>
            {gridLists2}
          </Grid>
        </Scroll>
      </Page>
    );
  }
}

```


## 参考
<p>
  <a href="https://react.docschina.org/">React</a>
</p>
<p>
  <a href="https://github.com/weui/weui">weui</a>
</p>
<p>
  <a href="https://github.com/ant-design/ant-design">Vue</a>
</p>
<p>
  <a href="https://github.com/ant-design/ant-design-mobile">ant-design-mobile</a>
</p>
<p>
  <a href="https://github.com/airyland/vux">vux</a>
</p>
<p>
  <a href="https://github.com/ElemeFE/mint-ui">mint-ui</a>
</p>
