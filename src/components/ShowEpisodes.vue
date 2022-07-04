<template>
  <section>
    <h3>Season {{ season }}</h3>

    <TableElement :header="tableConfiguration.header" :items="tableConfiguration.items" show-header striped></TableElement>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RawEpisode } from '@/composables/useTvMazeApi'
import TableElement from '@/components/TableElement.vue'
import useText from '@/composables/useText'

export default defineComponent({
  components: { TableElement },
  props: {
    episodes: {
      type: Array as PropType<RawEpisode[]>,
      required: true
    },
    season: {
      type: String as PropType<string>,
      default: '1'
    }
  },
  setup (props) {
    const { toDateTimeString } = useText()

    const tableConfiguration = {
      header: [
        {
          key: 'number',
          label: '#',
          width: '10%'
        },
        {
          key: 'name',
          label: 'Name',
          width: '50%'
        },
        {
          key: 'airstamp',
          label: 'Airtime',
          width: '40%',
          format: (rawValue: string) => toDateTimeString(rawValue)
        }
      ],
      items: props.episodes
    }

    return {
      tableConfiguration
    }
  }
})
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 20px;
}
</style>
