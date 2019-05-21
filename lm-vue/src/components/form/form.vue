<template>
  <form class="vup-form">
    <slot></slot>
  </form>
</template>
<script>
import WxValidate from './validate'
import { isObject, isFunction, isArray, isString } from '@/utils'
import addMethodMap from '@/utils/validate'
export default {
  name: 'vup-form',
  componentName: 'vup-form',
  provide () {
    return {
      'vup-form': this
    }
  },
  props: {
    /**
     * [model 校验数据对象]
     * @type {[type]}
     */
    model: Object,
    /**
     * [rules 校验规则]
     * @type {[type]}
     */
    rules: Object,
    /**
     * [messages 校验提示]
     * @type {[type]}
     */
    messages: Object,
    /**
     * [inlineMessage 是否开启行内错误提示]
     * @type {Object}
     */
    inlineMessage: {
      type: Boolean,
      default: false
    },
    /**
     * [labelWidth 左边label文字宽度]
     * @type {[type]}
     */
    labelWidth: String,
    /**
     * [labelAlign 左边label文字对齐方式]
     * @type {[type]}
     */
    labelAlign: String
  },
  watch: {
    /**
     * [rules 监听规则变化]
     * @type {Object}
     */
    rules: {
      handler (nVal, oVal) {
        if (nVal) this.validateRules = nVal;
      },
      deep: true,
      immediate: true
    },
    /**
     * [messages 监听提示与变化]
     * @type {Object}
     */
    messages: {
      handler (nVal, oVal) {
        if (nVal) this.validateMessages = nVal;
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      validateRules: {}, // 存储校验规则
      validateMessages: {} // 存储校验提示语
    };
  },
  created () {
    /**
     * [对外提供添加自定校验规则]
     * @param  {[type]} 'vup.form.addMethod' [description]
     * @param  {[type]} (field             [description]
     * @return {[type]}                    [description]
     */
    this.$on('vup.form.addMethod', (fields) => {
      if (fields && fields['prop'] && fields['rules'] && fields['messages']) {
        let key = fields['prop']
        if (!this.validateRules[key]) this.validateRules[key] = {}
        if (!this.validateMessages[key]) this.validateMessages[key] = {}
        this.validateRules[key] = fields['rules']
        this.validateMessages[key] = fields['messages']
      } else {
        this.$stateHandle('form.addMethod:参数错误');
      }
    });
    /* istanbul ignore next */
    /**
     * [对外提供移除功能]
     * @param  {[type]} 'vup.form.removeMethod' [description]
     * @param  {[type]} (field                [description]
     * @return {[type]}                       [description]
     */
    this.$on('vup.form.removeMethod', (fields) => {
      if (fields.prop) {
        let key = fields['prop']
        delete this.validateRules[key]
        delete this.validateMessages[key]
      } else {
        this.validateRules = {}
        this.validateMessages = {}
      }
    })
  },
  methods: {
    /**
     * [validate 校验函数]
     * @param  {[type]} option  [description]
     * @param  {[type]} context [description]
     * @return {[type]}         [description]
     */
    validate (callback) {
      let _validator = {}
      let promise
      let errors
      let _validate = new WxValidate(this.validateRules, this.validateMessages)
      for (let key in this.validateRules) {
        if (addMethodMap[key] && addMethodMap[key].name && addMethodMap[key] && addMethodMap[key].method) {
          _validate.addMethod(addMethodMap[key].name, function (value, param) {
            return addMethodMap[key].method.call(_validate, value, param)
          }, addMethodMap[key].message);
        }
      }
      /**
       * [_checkForm 调用check表单字段规则方法]
       * @type {[type]}
       */
      let _checkForm = _validate.checkForm(this.model);
      /**
       * [checkForm 验证所有字段的规则，返回验证是否通过]
       * @return {[Boolean]} [true/false]
       */
      _validator.checkForm = function () {
        return _checkForm;
      };
      /**
       * [valid 返回验证是否通过]
       * @return {[Boolean]} [true/false]
       */
      _validator.valid = function () {
        return _validate.valid();
      };
      /**
       * [size 返回错误信息的个数]
       * @return {[Number]} [number]
       */
      _validator.size = function () {
        return _validate.size();
      }
      /**
       * [validationErrors 返回所有错误信息]
       * @return {[Array]} [array]
       */
      _validator.validationErrors = function () {
        return _validate.validationErrors();
      }
      // 校验是否通过，没有通过则对错误结果进行处理
      errors = _validate.validationErrors() || []
      // 如果不存在 callback, 返回promise对象
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function (_checkForm) {
            _checkForm ? resolve(_checkForm) : reject((errors[0] && errors[0].msg) || null);
          };
        });
      }
      // 执行回调函数
      callback && callback(_checkForm, (errors[0] && errors[0].msg) || null);
      if (promise) {
        return promise;
      }
    }
  }
};
</script>
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/flex.scss';
@import '~@/theme/form.scss';
</style>
