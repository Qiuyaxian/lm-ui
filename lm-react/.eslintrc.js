// https://eslint.org/docs/user-guide/configuring

module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
    "eslint:recommended",
    "plugin:flowtype/recommended"
  ],
  "plugins": ["react", "jsx-a11y", "flowtype"],
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jest": true
  },
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    }
  },
  "rules": {
    "jsx-a11y/no-static-element-interactions": 0,
    "react/self-closing-comp": 0,
    "react/jsx-no-bind": 0,
    "react/jsx-curly-spacing": 0,
    "react/no-string-refs": 0,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-boolean-value": 0,
    "react/no-did-mount-set-state": 1,
    "react/jsx-first-prop-new-line": 0,
    "react/jsx-max-props-per-line": 0,
    "react/require-default-props": 0,
    "jsx-a11y/img-has-alt": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "import/no-named-as-default-member": 0,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": [1, { "devDependencies": ["**/__test__/**/*.js", "**/__test__/**/*.jsx", "**/*_test.jsx", "**/*_test.js"] }],
    "no-empty": 1,
    "no-console": 1,
    "react/sort-comp": 0,
    "react/prefer-stateless-function": 0,
    "react/prop-types": [1, { "ignore": ["children", "key"] }],
    "react/no-find-dom-node": 0,
    "react/no-unused-prop-types": 1,
    "react/forbid-prop-types": [1, { "forbid": ["array"] }],
    "react/no-array-index-key": 0
  },
  "ecmaFeatures": {
    // lambda表达式  
    "arrowFunctions": true,
    // 解构赋值  
    "destructuring": true,
    // class  
    "classes": true,
    // http://es6.ruanyifeng.com/#docs/function#函数参数的默认值  
    "defaultParams": true,
    // 块级作用域，允许使用let const  
    "blockBindings": true,
    // 允许使用模块，模块内默认严格模式  
    "modules": true,
    // 允许字面量定义对象时，用表达式做属性名  
    // http://es6.ruanyifeng.com/#docs/object#属性名表达式  
    "objectLiteralComputedProperties": true,
    // 允许对象字面量方法名简写  
    /*var o = { 
        method() { 
          return "Hello!"; 
        } 
     }; 
 
     等同于 
 
     var o = { 
       method: function() { 
         return "Hello!"; 
       } 
     }; 
    */
    "objectLiteralShorthandMethods": true,
    /* 
      对象字面量属性名简写 
      var foo = 'bar'; 
      var baz = {foo}; 
      baz // {foo: "bar"} 
 
      // 等同于 
      var baz = {foo: foo}; 
    */
    "objectLiteralShorthandProperties": true,
    // http://es6.ruanyifeng.com/#docs/function#rest参数  
    "restParams": true,
    // http://es6.ruanyifeng.com/#docs/function#扩展运算符  
    "spread": true,
    // http://es6.ruanyifeng.com/#docs/iterator#for---of循环  
    "forOf": true,
    // http://es6.ruanyifeng.com/#docs/generator  
    "generators": true,
    // http://es6.ruanyifeng.com/#docs/string#模板字符串  
    "templateStrings": true,
    "superInFunctions": true,
    // http://es6.ruanyifeng.com/#docs/object#对象的扩展运算符  
    "experimentalObjectRestSpread": true,
    // 强制object.key 中 . 的位置，参数:
    //      property，'.'号应与属性在同一行
    //      object, '.' 号应与对象名在同一行
    "dot-location": [2, "property"],
    // 强制使用.号取属性
    //    参数： allowKeywords：true 使用保留字做属性名时，只能使用.方式取属性
    //                          false 使用保留字做属性名时, 只能使用[]方式取属性 e.g [2, {"allowKeywords": false}]
    //           allowPattern:  当属性名匹配提供的正则表达式时，允许使用[]方式取值,否则只能用.号取值 e.g [2, {"allowPattern": "^[a-z]+(_[a-z]+)+$"}]
    "dot-notation": [2, { "allowKeywords": true }],
  }
}
