<template>
  <figure>
    <img :src="show.image.original" :alt="show.name" loading="lazy" />
  </figure>
  <section>
    <h1>{{ show.name }}</h1>
    <TableElement :header="tableConfiguration.header" :items="tableConfiguration.items"></TableElement>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import TagsList from '@/components/TagsList.vue'
import { RawShow } from '@/composables/useTvMazeApi'
import TableElement from '@/components/TableElement.vue'
import useText from '@/composables/useText'

export default defineComponent({
  components: { TableElement },
  props: {
    show: {
      type: Object as PropType<RawShow>,
      required: true
    }
  },
  setup (props) {
    const { toDateString } = useText()

    const tableConfiguration = {
      header: [
        {
          key: 'label',
          width: '25%'
        },
        {
          key: 'value'
        }
      ],
      items: [
        {
          value: {
            component: TagsList,
            tags: props.show.genres
          },
          label: 'Genres'
        },
        {
          value: props.show.status,
          label: 'Status'
        },
        {
          value: toDateString(props.show.premiered),
          label: 'Premiered at'
        },
        {
          value: props.show.averageRuntime,
          label: 'Average Runtime'
        },
        {
          value: props.show.rating.average,
          label: 'Average Rating'
        },
        {
          value: props.show.summary,
          label: 'Summary'
        }
      ]
    }

    return {
      tableConfiguration
    }
  }
})
</script>

<style lang="scss" scoped>
figure {
  img {
    max-height: 450px;
    width: auto;
    display: block;
  }
}

section {
  flex-grow: 2;
}

h1 {
  color: #008efd;
  font-size: 24px;
}

@media screen and (max-width: 600px) {
  figure {
    img {
      max-height: none;
      width: 100%;
      height: auto;
    }
  }
}
</style>
