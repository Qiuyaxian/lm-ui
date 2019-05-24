// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    },
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    'eslint:recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  globals: {'expect': true, 'it': true, 'describe': true, 'ga': true, 'window': true, 'document': true, 'alert': true, 'api': true, 'apiready': true},
  // required to lint *.vue files
  plugins: [
    'vue',
    'html'
  ],
  // add your custom rules here
  rules: {
    'eol-last': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // 不能有无法执行的代码
    "no-unreachable": 0,
    // 
    "no-unused-vars": 0,
    // 关闭语句强制分号结尾
    "semi": [0],
    "no-fallthrough": 0,
    "no-self-assign ": 0,
    "quotes": 0,
    "one-var": 0,
    "no-useless-escape": 0,
    "comma-dangle": 0,
    "no-mixed-operators": 0,
    "curly": 0,
    "space-before-function-paren": 0,
    // 键和值前保留一个空格
    'key-spacing': ["error", { "beforeColon": false, "afterColon": true }],
    // 回调函数需要return进行返回
    'callback-return': 0,
    /* for vue */
    // 禁止重复的二级键名
    // @off 没必要限制
    'vue/no-dupe-keys': 'off',
    // 禁止出现语法错误
    // vue将标签渲染为原生html标签时，由于这些标签是自闭合的，所以有end标签会报错
    'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }],
    // 禁止覆盖保留字
    //'vue/no-reservered-keys': 'error',
    // 组件的 data 属性的值必须是一个函数
    // @off 没必要限制
    'vue/no-shared-component-data': 'off',
    // 禁止 <template> 使用 key 属性
    // @off 太严格了
    'vue/no-template-key': 'off',
    // render 函数必须有返回值
    'vue/require-render-return': 'error',
    // prop 的默认值必须匹配它的类型
    // @off 太严格了
    'vue/require-valid-default-prop': 'off',
    // 计算属性必须有返回值
    'vue/return-in-computed-property': 'error',
    // template 的根节点必须合法
    'vue/valid-template-root': 'error',
    // v-bind 指令必须合法
    'vue/valid-v-bind': 'error',
    // v-cloak 指令必须合法
    'vue/valid-v-cloak': 'error',
    // v-else-if 指令必须合法
    'vue/valid-v-else-if': 'error',
    // v-else 指令必须合法
    'vue/valid-v-else': 'error',
    // v-for 指令必须合法
    'vue/valid-v-for': 'error',
    // v-html 指令必须合法
    'vue/valid-v-html': 'error',
    // v-if 指令必须合法
    'vue/valid-v-if': 'error',
    // v-model 指令必须合法
    'vue/valid-v-model': 'error',
    // v-on 指令必须合法
    'vue/valid-v-on': 'error',
    // v-once 指令必须合法
    'vue/valid-v-once': 'error',
    // v-pre 指令必须合法
    'vue/valid-v-pre': 'error',
    // v-show 指令必须合法
    'vue/valid-v-show': 'error',
    // v-text 指令必须合法
    'vue/valid-v-text': 'error',
    //
    // 最佳实践
    //
    // @fixable html 的结束标签必须符合规定
    // @off 有的标签不必严格符合规定，如 <br> 或 <br/> 都应该是合法的
    'vue/html-end-tags': 'off',
    // 计算属性禁止包含异步方法
    'vue/no-async-in-computed-properties': 'off',
    // 禁止出现难以理解的 v-if 和 v-for
    'vue/no-confusing-v-for-v-if': 'error',
    // 禁止出现重复的属性
    'vue/no-duplicate-attributes': 'off',
    // 禁止在计算属性中对属性修改
    // @off 太严格了
    'vue/no-side-effects-in-computed-properties': 'off',
    // 禁止在 <textarea> 中出现 {{message}}
    'vue/no-textarea-mustache': 'error',
    // 组件的属性必须为一定的顺序
    'vue/order-in-components': 'off',
    // <component> 必须有 v-bind:is
    'vue/require-component-is': 'error',
    // prop 必须有类型限制
    // @off 没必要限制
    'vue/require-prop-types': 'off',
    // v-for 指令的元素必须有 v-bind:key
    'vue/require-v-for-key': 'error',
    //
    // 风格问题
    //
    // @fixable 限制自定义组件的属性风格
    // @off 没必要限制
    'vue/attribute-hyphenation': 'off',
    // html 属性值必须用双引号括起来
    'vue/html-quotes': 'off',
    // @fixable 没有内容时，组件必须自闭和
    // @off 没必要限制
    'vue/html-self-closing': 'off',
    // 限制每行允许的最多属性数量
    // @off 没必要限制
    'vue/max-attributes-per-line': 'off',
    // @fixable 限制组件的 name 属性的值的风格
    // @off 没必要限制
    'vue/name-property-casing': 'off',
    // @fixable 禁止出现连续空格
    // 'vue/no-multi-spaces': 'error',
    // @fixable 限制 v-bind 的风格
    // @off 没必要限制
    'vue/v-bind-style': 'off',
    // @fixable 限制 v-on 的风格
    // @off 没必要限制
    'vue/v-on-style': 'off',
    // 定义了的 jsx element 必须使用
    'vue/jsx-uses-vars': 'off',
    'no-console': 0,
    'no-empty': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
