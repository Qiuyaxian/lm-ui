<template>
  <i :class="[className, isMsg ? 'weui-icon_msg' : '']"></i>
</template>

<script>
export default {
  name: 'lm-icon',
  props: {
    type: String,
    isMsg: Boolean
  },
  computed: {
    className () { // compatible with old type param
      return `weui-icon weui_icon_${this.type} weui-icon-${this.type.replace(/_/g, '-')}`
    }
  }
}
</script>