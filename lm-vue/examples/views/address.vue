<template>
  <lm-page>
    <lm-header>Address</lm-header>
    <lm-group>
      <lm-address
        @on-hide="logHide"
        @on-show="logShow"
        label="App.vue"
        v-model="value"
        :data="addressData"
        :show.sync="showAddress"
        @on-shadow-change="onShadowChange"
        placeholder="请选择地址">
      </lm-address>
      <lm-cell label="js调用结果">{{ result }}</lm-cell>
    </lm-group>
    <lm-button @click.native="clickHandle" type="primary">js 调用</lm-button>
  </lm-page>
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
    clickHandle() {
      let _this = this;
      this.$lm.address.show({
        data: ChinaAddressV4Data,
        value: this.value2,
        onShadowChange (ids, names) {
          _this.value2 = ids;
          _this.result = names;
        },
        onShow () {
          console.log('调用show')
        },
        onHide () {
          console.log('调用hide')
        }
      })
    },
    onConfirm (val) {
      console.log('on-confirm arg', val)
      console.log('current value', this.value1)
    }
  },
  data () {
    return {
      value: ['150000', '150100', '150102'],
      show: false,
      value2: [],
      result: [],
      show2: false,
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
