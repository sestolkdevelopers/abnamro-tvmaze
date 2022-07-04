<template>
  <div class="tags">
    <template v-if="linkable">
      <a href="#" class="tag" v-for="(tag, index) in tags" :key="index">
        {{ tag }}
      </a>
    </template>
    <template v-else>
      <div class="tag" v-for="(tag, index) in tags" :key="index">
        {{ tag }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    },
    url: {
      type: String
    },
    linkable: Boolean
  },
  setup () {
    return {}
  }
})
</script>

<style scoped lang="scss">
.tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  align-items: center;

  .tag {
    padding: 5px 10px;
    font-size: 11px;
    text-align: center;
    border: 1px solid #0b2338;
    border-radius: 5px;
    white-space: nowrap;
  }
}
</style>
