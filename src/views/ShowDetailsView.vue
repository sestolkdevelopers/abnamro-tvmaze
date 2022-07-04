<template>
  <main>
    <LoadingSection v-show="fetchingShow" color="#008efd">
      Please wait... The show is being retrieved
    </LoadingSection>
    <template v-if="!fetchingShow && fetchedShow.show">
      <SlideFadeInTransition>
        <article>
          <ShowDetails :show="fetchedShow.show"></ShowDetails>
        </article>
      </SlideFadeInTransition>
      <SlideFadeInTransition>
        <div class="episodes">
          <ShowEpisodes v-for="(episodes, index) in fetchedShow.seasons" :episodes="episodes" :season="index" :key="index"></ShowEpisodes>
        </div>
      </SlideFadeInTransition>
    </template>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getShow } from '@/services/TvMazeService'
import { useStore } from 'vuex'
import usePageTitle from '@/composables/usePageTitle'
import ShowEpisodes from '@/components/ShowEpisodes.vue'
import ShowDetails from '@/components/ShowDetails.vue'
import SlideFadeInTransition from '@/components/SlideFadeInTransition.vue'
import LoadingSection from '@/components/LoadingSection.vue'

export default defineComponent({
  components: { LoadingSection, SlideFadeInTransition, ShowDetails, ShowEpisodes },
  setup () {
    const route = useRoute()
    const store = useStore()
    const { setPageTitle } = usePageTitle()
    const fetchedShow = computed(() => store.state.show.results)
    const fetchingShow = computed(() => store.state.show.fetching)

    watch(
      () => route.params.id as string,
      (id) => {
        if (!id || id.length === 0) {
          return
        }

        // Very cheap caching mechanism
        if (
          store.state.show.results &&
          store.state.show.results.show &&
          store.state.show.results.show.id &&
          store.state.show.results.show.id === parseInt(id, 3)
        ) {
          return
        }

        getShow(id, store)
      },
      { immediate: true }
    )

    watch(
      () => fetchedShow,
      (show) => {
        if (!show.value.show) {
          return
        }

        setPageTitle(show.value.show.name)
      },
      { immediate: true }
    )

    return {
      fetchedShow,
      fetchingShow
    }
  }
})
</script>

<style lang="scss" scoped>
article {
  display: flex;
  gap: 10px 20px;
  margin: 20px 0;
}

.episodes {
  margin: 20px 0;
}

@media screen and (max-width: 600px) {
  article {
    flex-direction: column;
  }
}
</style>
