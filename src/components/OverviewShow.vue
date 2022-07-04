<template>
  <SlideFadeInTransition>
    <article>
      <figure>
        <router-link :to="showLink">
          <img :src="showImage" :alt="showDetails.title" loading="lazy" />
        </router-link>
      </figure>
      <MainAndSubTitle el="h3" :url="showLink">
        {{ showDetails.name }}
        <template #subtitle>{{ premieredYear }}</template>
      </MainAndSubTitle>
      <TagsList class="genres" :tags="showDetails.genres"></TagsList>
      <div class="summary">{{ summary }}</div>
      <div class="info">
        <div class="info-item info-label" :class="showDetails.status !== 'Ended' ? 'green' : 'red'">
          {{ showDetails.status }}
        </div>
        <div class="info-item">R: {{ showDetails.rating.average }}</div>
        <div class="info-item">~{{ showDetails.averageRuntime }} min</div>
      </div>
    </article>
  </SlideFadeInTransition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import MainAndSubTitle from '@/components/MainAndSubTitle.vue'
import TagsList from '@/components/TagsList.vue'
import { RouteLocationRaw } from 'vue-router'
import useText from '@/composables/useText'
import SlideFadeInTransition from '@/components/SlideFadeInTransition.vue'

export default defineComponent({
  components: { SlideFadeInTransition, TagsList, MainAndSubTitle },
  props: {
    showDetails: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const { toPlainText, cutOff, toYearString } = useText()

    const premieredYear = computed(() => toYearString(props.showDetails.premiered))

    const showImage = computed(() => {
      if (props.showDetails.image && props.showDetails.image.medium) {
        return props.showDetails.image.medium
      }

      return 'https://place-hold.it/210x295'
    })

    const summary = computed(() => {
      const plainText = toPlainText(props.showDetails.summary)

      return cutOff(plainText, 100)
    })

    const showLink: RouteLocationRaw = {
      name: 'show-details',
      params: {
        id: props.showDetails.id
      }
    }

    return {
      premieredYear,
      showImage,
      summary,
      showLink
    }
  }
})
</script>

<style scoped lang="scss">
article {
  width: 210px;
  display: flex;
  flex-direction: column;

  figure {
    height: 295px;
    width: 210px;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }

  h3 {
    padding: 10px 0;

    :deep(a) {
      text-decoration: none;

      > .main-title {
        color: #2c3e50;
      }

      > .sub-title {
        color: #c1c1c1;
      }

      &:hover > .main-title {
        text-decoration: underline;
      }
    }
  }

  .tags {
    padding: 0 0 10px 0;
  }

  .summary {
    margin-bottom: 10px;
  }

  .info {
    margin-top: auto;
    display: flex;
    flex-direction: row;
    border-top: 1px solid #15426d;
    padding: 10px 0;

    .info-item {
      flex-grow: 1;
      text-align: center;
      font-size: 14px;
      padding: 5px 0;
    }

    .info-label {
      background: #c1c1c1;
      font-weight: bold;
      border-radius: 5px;

      &.green {
        background-color: #008200;
        color: #e2e2e2;
      }

      &.red {
        background-color: #820000;
        color: #e2e2e2;
      }
    }
  }
}
</style>
