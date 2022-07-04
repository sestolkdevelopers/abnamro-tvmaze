<template>
  <section>
    <LoadingIcon :color="color"></LoadingIcon>
    <div class="loader-text"><slot></slot></div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoadingIcon from '@/components/LoadingIcon.vue'

export default defineComponent({
  components: { LoadingIcon },
  props: {
    color: {
      type: String
    }
  },
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  gap: 20px;

  .loader-text {
    font-size: 22px;
    text-align: center;
  }
}
</style>
