<template>
  <lm-template>
    <lm-navbar>popup-picker</lm-navbar>
    <lm-group title="single column" label-width="5em">
      <lm-popup-picker :label="title1" :data="list1" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :placeholder="'请选择'"></lm-popup-picker>
      <lm-popup-picker :popup-title="'请选择'" :label="title1" :data="list1" v-model="value1_1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :placeholder="'请选择'"></lm-popup-picker>
      <lm-datetime label="datetime" v-model="date"></lm-datetime>
    </lm-group>
    <br>
    <div class="picker-buttons">
       <lm-button type="primary" @click.native="value1=[]">将值置为空</lm-button>
       <lm-button type="primary" @click.native="changeList10">重新赋值列表</lm-button>
       <lm-button type="primary" @click.native="changeList11">push方式更改列表</lm-button>
     </div>
     <lm-group title="double columns">
       <lm-popup-picker :label="title2" :data="list2" v-model="value2"></lm-popup-picker>
     </lm-group>
     <br>

     <lm-group title="chained columns">
       <lm-popup-picker :label="title3" :data="list3" :columns="3" v-model="value3" ref="picker3"></lm-popup-picker>
       <lm-cell label="获取值对应的文字" :content="$refs.picker3 && $refs.picker3.getNameValues()"></lm-cell>
       <lm-popup-picker :label="title4" :data="list3" :columns="3" v-model="value4" show-name></lm-popup-picker>
     </lm-group>

     <br>
     <div class="picker-buttons">
       <lm-button type="primary" @click.native="changeList21">push方式更改列表</lm-button>
     </div>
     <br>
     <lm-divider>Control the visibility of lm-popup-picker</lm-divider>
     <div style="margin: 0 15px;">
       <lm-button @click.native="showPopupPicker = true" type="primary">Show PopupPicker. value: {{value5 }}</lm-button>
     </div>
     <lm-group>
       <lm-popup-picker :show.sync="showPopupPicker" :show-cell="false" label="test" :data="[['1', '2', '3', '4', '5']]" v-model="value5"></lm-popup-picker>
     </lm-group>

     <br>
     <lm-group title="隐藏时不影响其他lm-popup-picker的mask">
       <lm-switch label="ishide lm-popup-picker" v-model="switch6"></lm-switch>
       <lm-popup-picker v-if="!switch6" label="显示值" :data="['我不会影响遮罩层'.split('')]" v-model="value6"></lm-popup-picker>
     </lm-group>

     <br>
     <br>

     <lm-group title="显示格式化">
      <lm-popup-picker
      v-model="formatDemoValue"
      label="时间"
      :inline-desc="`当前值[${formatDemoValue}]`"
      :data="[['01','02','03'],['11','12','13']]" :display-format="format"></lm-popup-picker>
     </lm-group>
  </lm-template>
</template>
<script>
let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}
export default {
  methods: {
    onChange (val) {
      console.log('val change', val)
    },
    changeList10 () {
      this.list1 = [['小米1', 'iPhone1', '华为1', '情怀1', '三星1', '其他1', '不告诉你1']]
    },
    changeList11 () {
      this.list1[0].push('我是push条目')
    },
    changeList20 () {

    },
    changeList21 () {
      this.list3.push({
        name: '美国002_007',
        value: '0007',
        parent: 'usa002'
      })
    },
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    }
  },
  data () {
    return {
      date: '',
      title1: '手机机型',
      title2: '详细机型',
      title3: '联动显示值',
      title4: '联动显示文字',
      list1: [
        [
          {
            name: '小米',
            value: '小米'
          },
          {
            name: 'iPhone',
            value: 'iPhone'
          },
          {
            name: '华为',
            value: '华为'
          },
          {
            name: '情怀',
            value: '情怀'
          },
          {
            name: '其他',
            value: '其他'
          },
          {
            name: '不告诉你',
            value: '不告诉你'
          }
        ]
      ],
      list2: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你'], ['小米1', 'iPhone2', '华为3', '情怀4', '三星5', '其他6', '不告诉你7']],
      list3: [{
        name: '中国',
        value: 'china',
        parent: 0
      }, {
        name: '美国',
        value: 'USA',
        parent: 0
      }, {
        name: '广东',
        value: 'china001',
        parent: 'china'
      }, {
        name: '广西',
        value: 'china002',
        parent: 'china'
      }, {
        name: '美国001',
        value: 'usa001',
        parent: 'USA'
      }, {
        name: '美国002',
        value: 'usa002',
        parent: 'USA'
      }, {
        name: '广州',
        value: 'gz',
        parent: 'china001'
      }, {
        name: '深圳',
        value: 'sz',
        parent: 'china001'
      }, {
        name: '广西001',
        value: 'gx001',
        parent: 'china002'
      }, {
        name: '广西002',
        value: 'gx002',
        parent: 'china002'
      }, {
        name: '美国001_001',
        value: '0003',
        parent: 'usa001'
      }, {
        name: '美国001_002',
        value: '0004',
        parent: 'usa001'
      }, {
        name: '美国002_001',
        value: '0005',
        parent: 'usa002'
      }, {
        name: '美国002_002',
        value: '0006',
        parent: 'usa002'
      }],
      value1: ['iPhone'],
      value1_1: ['iPhone'],
      value2: ['iPhone', '华为3'],
      value3: [],
      value4: [],
      showPopupPicker: false,
      value5: ['2'],
      switch6: false,
      value6: [],
      formatDemoValue: ['01', '12'],
      format: function (value, name) {
        return `${value[0]}:${value[1]}`
      }
    }
  }
}
</script>
<style lang="scss">
.picker-buttons {
  margin: 0 15px;
}
</style>
