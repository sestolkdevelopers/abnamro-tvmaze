<template>
  <component :is="el">
    <router-link :to="url">
      <span class="main-title"><slot></slot></span>
      <span class="sub-title"><slot name="subtitle"></slot></span>
    </router-link>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RouteLocationRaw } from 'vue-router'

export default defineComponent({
  props: {
    el: {
      type: String,
      required: true
    },
    url: {
      type: Object as PropType<RouteLocationRaw>,
      required: true
    }
  },
  setup () {
    return {}
  }
})
</script>

<style scoped lang="scss">
h1, h2, h3, h4, h5 {
  a {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;

    .main-title {
      flex-grow: 1;
    }
  }
}
</style>
