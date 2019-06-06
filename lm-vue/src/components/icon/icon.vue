<template>
  <i :class="[className, isMsg ? 'weui-icon_msg' : '']"></i>
</template>

<script>
export default {
  name: 'lm-icon',
  props: {
    /**
     * [type 按钮类型]
     * @type {[type]}
     */
    type: String,
    /**
     * [type 是否是消息类型]
     * @type {[type]}
     */
    isMsg: Boolean
  },
  computed: {
    className () { // compatible with old type param
      return `weui-icon weui_icon_${this.type} weui-icon-${this.type.replace(/_/g, '-')}`
    }
  }
}
</script>