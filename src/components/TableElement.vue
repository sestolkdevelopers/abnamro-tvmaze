<template>
  <table :class="{striped: striped}">
    <thead v-if="showHeader">
      <tr>
        <th v-for="headerItem in header" :key="headerItem.key">{{ headerItem.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, itemIndex) in items" :key="itemIndex">
        <td v-for="headerItem in header" :style="{'width': headerItem.width ?? 'auto'}" :key="headerItem.key">
          <template v-if="!item[headerItem.key]"></template>
          <component v-else-if="item[headerItem.key].component"
                     :is="item[headerItem.key].component"
                     v-bind="item[headerItem.key]"></component>
          <template v-else-if="headerItem.format">
            {{ headerItem.format(item[headerItem.key]) }}
          </template>
          <div v-else v-html="item[headerItem.key]"></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    header: {
      type: Object,
      required: true
    },
    showHeader: {
      type: Boolean
    },
    striped: {
      type: Boolean
    },
    items: {
      type: Array
    }
  },
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>

table {
  width: 100%;
  border-collapse: collapse;

  &.striped {
    tr {
      &:nth-child(odd) {
        td {
          background-color: #f3f3f3;
        }
      }
    }
  }

  th, td {
    text-align: left;
    padding: 7px 5px;
    vertical-align: top;
  }

  th {
    border-bottom: 2px solid #15426d;
  }
}
</style>
