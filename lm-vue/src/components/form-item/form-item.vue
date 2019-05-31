<template>
  <div class="lm-flex lm-flex-items-c lm-form-row" :class="cellClass">
    <p>
      <label :for="labelFor" class="lm-flex-shrink lm-form-label">
        <slot name="title">{{ title }}</slot>
      </label>
    </p>
    <div class="lm-flex-grow">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { dispatchMixin } from '@/mixins'
import WxValidate from '@/utils/WxValidate'
import { isObject, isFunction, isArray, isString, getPropByPath, addEventHandle, getByName, cleanStyle, getParentProp } from '@/utils'
import addMethodMap from '@/utils/validate.js'
export default {
  name: 'lm-form-item',
  componentName: 'lm-form-item',
  /**
   * [mixins 混合注入]
   * @type {Array}
   */
  mixins: [dispatchMixin],
  /**
   * [provide 提供跨组件方法]
   * @return {[type]} [description]
   */
  provide () {
    return {
      lmFormItem: this
    };
  },
  /**
   * [inject 注入父级]
   * @type {Array}
   */
  inject: ['lm-form'],
  props: {
    /**
     * [title label 文字内容]
     * @type {Array}
     */
    title: [String, Number],
    /**
     * [labelWidth 设置label宽度]
     * @type {[type]}
     */
    labelWidth: String,
    /**
     * [prop 绑定字段key]
     * @type {[type]}
     */
    prop: String,
    /**
     * [validate 自定义当前子祥校验规则]
     * @type {[
     *   { rules: true, messages: '请输入手机号码', }
     * ]}
     */
    rules: [Object, Array],
    /**
     * [error 错误信息]
     * @type {[type]}
     */
    error: String,
    /**
     * [for label绑定]
     * @type {[type]}
     */
    for: String,
    labelAlign: String
  },
  watch: {
    /**
     * [error 监听error变化]
     * @type {Object}
     */
    error: {
      immediate: true,
      handler (value) {
        // this.validateMessage = value;
      }
    }
  },
  computed: {
    cellClass () {
      return {
        'lm-flex-items-s': this.labelAlign === 'top' || this.form.labelAlign === 'top'
      }
    },
    /**
     * [form 获取到父级]
     * @return {[type]} [description]
     */
    form () {
      let parent = this.$parent
      let _this = this
      let parentName = parent.$options.componentName
      while (parentName !== 'lm-form') {
        if (parentName === 'lm-form-item') {
          _this.isNested = true
        }
        parent = parent.$parent
        parentName = parent.$options.componentName
      }
      return parent
    },
    /**
     * [labelFor 关联项]
     * @return {[type]} [description]
     */
    labelFor () {
      return this.for || this.prop;
    },
    /**
     * [getInlineMessage 获取行内提示错误提示语]
     * @return {[type]} [description]
     */
    getInlineMessage () {
      return this.form.inlineMessage;
    },
    /**
     * [fieldValue 获取绑定的值]
     * @type {Object}
     */
    fieldValue: {
      cache: false,
      get () {
        const model = this.form.model
        if (!model || !this.prop) { return; }
        let path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }
        return getPropByPath(model, path, true).v;
      }
    },
    labelStyle () {
      const ret = {}
      const labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth) {
        ret.width = labelWidth;
      }
      return ret;
    }
  },
  data () {
    return {
      isNested: false,
      validateMessage: '' // 错误信息
    }
  },
  methods: {
    /**
     * [validate 获取当前子项校验错误信息]
     * @return {[type]} [description]
     */
    validate () {
      // 调用校验方法
      let rules = {}
      let messages = {}
      let _this = this
      rules[this.prop] = this.getRules()
      messages[this.prop] = this.getMessages()
      let _validate = new WxValidate(rules, messages)
      // 调用校验方法
      for (let key in rules) {
        if (addMethodMap[key] && addMethodMap[key].name && addMethodMap[key] && addMethodMap[key].method) {
          _validate.addMethod(addMethodMap[key].name, function (value, param) {
            return addMethodMap[key].method.call(_validate, value, param);
          }, addMethodMap[key].message);
        }
      }
      let model = {};
      model[this.prop] = this.fieldValue;
      // 调用check表单字段规则方法
      let _checkForm = _validate.checkForm(model);
      let errorMap
      // 校验是否通过，没有通过则对错误结果进行处理
      if (!_checkForm) {
        let errors = _validate.validationErrors()
        // 更新错误结果集
        errors.forEach(item => {
          _this.validateMessage = item.msg;
        });
      }
    },
    validateFocus () {
      if (getByName(this.prop).length !== 0) {
        // addEventHandle(document.getElementsByName(this.prop)[0],'focus',() => {
        //   this.validateMessage = '';
        // });
      }
    },
    /**
     * [validateChange 输入框发生变化]
     * @return {[type]} [description]
     */
    validateChange () {
      let _this = this;
      if (getByName(this.prop).length !== 0) {
        addEventHandle(getByName(this.prop)[0], 'compositionstart', () => {
          _this.validate();
        });
        addEventHandle(getByName(this.prop)[0], 'compositionend', () => {
          _this.validate();
        });
      }
    },
    /**
     * [getRules 获取校验规则]
     * @return {[type]} [description]
     */
    getRules () {
      let validate = this.rules
      let rules = {}
      if (!isArray(validate) && !isObject(validate)) {
        throw new Error('参数错误')
        return false;
      }
      if (isArray(validate)) {
        validate.forEach(item => {
          let rule = item['rules'];
          if (isString(rule)) {
            rules[item['rules']] = true
          } else if (isObject(rule)) {
            for (let k in rule) {
              rules[k] = true
            }
          }
        });
      } else {
        let rule = validate['rules'];
        let message = validate['messages']
        if (isString(rule)) {
          rules[rule] = true
        } else if (isObject(rule)) {
          for (let k in rule) {
            rules[k] = true
          }
        }
      }
      return rules
    },
    /**
     * [getMessages 获取提示信息]
     * @return {[type]} [description]
     */
    getMessages () {
      let validate = this.rules
      let messages = {}
      if (!isArray(validate) && !isObject(validate)) {
        throw new Error('参数错误')
        return false;
      }
      if (isArray(validate)) {
        validate.forEach(item => {
          let rule = item['rules'];
          if (isString(rule)) {
            messages[item['rules']] = item['messages']
          } else if (isObject(rule)) {
            for (let k in rule) {
              messages[k] = rule[k]['messages']
            }
          }
        });
      } else {
        let rule = validate['rules'];
        let message = validate['messages']
        if (isString(rule)) {
          messages[rule] = validate['messages']
        } else if (isObject(rule)) {
          for (let k in rule) {
            messages[k] = message[k]
          }
        }
      }
      return messages;
    }
  },
  mounted () {
    // 当前item上的校验规则附加到form上 调用父级的添加方法
    if (this.validate && this.prop) {
      this.dispatch('lmForm', 'lm.form.addMethod', {
        'prop': this.prop,
        'rules': this.getRules(),
        'messages': this.getMessages()
      });
      // 是否获取当前错误
      // this.validateFocus();
      // this.validateChange();
      // _this.validate();
    }
  },
  beforeDestroy () {
    /**
     * 清除绑定
     */
    this.dispatch('lm-form', 'lm.form.removeMethod', [this]);
  }
}
</script>