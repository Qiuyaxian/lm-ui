<template>
  <lm-template>
    <lm-navbar>popup</lm-navbar>
    <lm-group title="底部弹出">
      <lm-switch label="switch" v-model="show"></lm-switch>
    </lm-group>

    <div v-transfer-dom>
      <lm-popup v-model="show" max-height="50%" position="bottom">
        <lm-group>
          <lm-cell v-for="i in 20" :key="i" :label="i"></lm-cell>
        </lm-group>
      </lm-popup>
    </div>

  </lm-template>
</template>
<script>

export default {
  data () {
    return {
      show: false
    }
  }
}
</script>
<style lang="scss">
.picker-buttons {
  margin: 0 15px;
}
</style>
