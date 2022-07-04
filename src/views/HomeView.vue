<template>
  <main>
    <LoadingSection v-show="fetchingShows" color="#008efd">
      Please wait... The shows are being retrieved
    </LoadingSection>
    <template v-if="fetchedShows && fetchedShows.length">
      <OverviewSection v-for="genre in fetchedShows" :key="genre.title" :title="genre.title" :shows="genre.shows"></OverviewSection>
    </template>
  </main>
</template>

<script>
import OverviewSection from '@/components/OverviewSection'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getShows } from '@/services/TvMazeService'
import { useStore } from 'vuex'
import LoadingSection from '@/components/LoadingSection'

export default {
  name: 'HomeView',
  components: {
    LoadingSection,
    OverviewSection
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    const fetchedShows = computed(() => store.state.genres.results)
    const fetchingShows = computed(() => store.state.genres.fetching)

    watch(
      () => route.params,
      () => {
        // Very cheap caching mechanism
        if (store.state.genres.results.length > 0) {
          return
        }

        getShows(store)
      },
      { immediate: true }
    )

    return {
      fetchedShows,
      fetchingShows
    }
  }
}
</script>

<style lang="scss">
main {
  padding: 0 20px;
}
</style>
