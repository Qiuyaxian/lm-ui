<template>
  <div class="vup-form-preview">
    <div class="vup-form-preview_hd">
      <label class="vup-form-preview_label" v-html="headerLabel"></label>
      <span class="vup-form-preview_value" v-html="headerValue || '&nbsp;'"></span>
    </div>
    <vup-cell-preview :list="previewItems"></vup-cell-preview>
  </div>
</template>
<script>
export default {
  name: 'vup-form-preview',
  componentName: 'vup-form-preview',
  props: ['headerLabel', 'headerValue', 'previewItems'],
  data () {
    return {}
  }
}
</script>
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/cell.scss';
.vup-form-preview{
  position: relative;
  background-color: #FFFFFF;
  &:before{
    @include borderStype(top);
  }
  &:after{
    @include borderStype(bottom);
  }
}
.vup-form-preview__hd{
  position: relative;
  /*padding: @weuiCellGapV @weuiCellGapH; 同cellpadding一致*/
  text-align: right;
  /*line-height: 2.5em;*/
  &:after{
    /*.setBottomLine(@weuiCellBorderColor);
    left: @weuiCellGapH;*/
  }
  .vup-form-preview__value{
      font-style: normal;
      font-size: 1.6em;
  }
}
.vup-form-preview__bd{
  /*padding: @weuiCellGapV @weuiCellGapH;
  font-size: .9em;
  text-align: right;
  color: @weuiTextColorGray;
  line-height: 2;*/
}
.weui-form-preview__item{
  overflow: hidden;
}
.weui-form-preview__label{
  /*float: left;
  margin-right: 1em;
  min-width: 4em;
  color: @weuiTextColorGray;
  text-align: justify;
  text-align-last: justify;*/
}
.weui-form-preview__value{
  /*display: block;
  overflow: hidden;
  word-break:normal;
  word-wrap: break-word;*/
}
</style>