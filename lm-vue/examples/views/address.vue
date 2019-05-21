<template>
  <vup-wrapper>
    <vup-navbar>Address</vup-navbar>
    <vup-group>
      <vup-address
        @on-hide="logHide"
        @on-show="logShow"
        title="App.vue"
        v-model="value"
        :list="addressData"
        :show.sync="showAddress"
        @on-shadow-change="onShadowChange"
        placeholder="请选择地址">
      </vup-address>
    </vup-group>
  </vup-wrapper>
</template>
<script>
import ChinaAddressV4Data from '@/components/address/china_address_v4.json'
export default {
  methods: {
    logHide (str) {
      console.log('on-hide', str)
    },
    logShow (str) {
      console.log('on-show')
    },
    onShadowChange (ids, names) {
      console.log(ids, names)
    },
    updateData () {
      this.show = true
    },
    change (value) {
      console.log('change', value)
    },
    onChange (val) {
      console.log('change', val)
    },
    log (str1, str2 = '') {
      console.log(str1, str2)
    },
    onConfirm (val) {
      console.log('on-confirm arg', val)
      console.log('current value', this.value1)
    }
  },
  data () {
    return {
      value: [],
      show: false,
      addressData: ChinaAddressV4Data,
      showAddress: false
    }
  }
}
</script>
<style lang="scss">
.picker-buttons {
  margin: 0 15px;
}
</style>
