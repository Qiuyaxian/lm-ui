<template>
  <lm-page>
    <lm-header>popup</lm-header>
    <lm-group title="底部弹出">
      <lm-switch label="switch" v-model="show"></lm-switch>
      <lm-switch label="switch" v-model="show2"></lm-switch>
    </lm-group>

    <div v-transfer-dom>
      <lm-popup v-model="show" max-height="50%" position="bottom">
        <lm-group>
          <lm-cell v-for="i in 20" :key="i" :label="i"></lm-cell>
        </lm-group>
      </lm-popup>
      <lm-popup v-model="show2" max-height="50%" position="bottom">
        <lm-group>
          <lm-cell v-for="i in 20" :key="i" :label="`${i}=>2`"></lm-cell>
        </lm-group>
      </lm-popup>
    </div>

  </lm-page>
</template>
<script>

export default {
  data () {
    return {
      show: false,
      show2: false
    }
  }
}
</script>
<style lang="scss">
.picker-buttons {
  margin: 0 15px;
}
</style>
