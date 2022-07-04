<template>
  <div class="search">
    <input type="text" placeholder="Search for a show" @input="event => onSearchInput(event.target.value)" @focus="openResults" @blur="closeResults" />
    <div class="results" v-show="searchIsFocused">
      <div v-show="fetchingSearchResults">Loading</div>
      <ul v-show="!fetchingSearchResults && fetchedSearchResults.length">
        <li v-for="result in fetchedSearchResults" :key="result.id">
          <router-link :to="{name: 'show-details', params: {id: result.show.id} }">
            <figure>
              <img :src="result.show.image && result.show.image.medium ? result.show.image.medium : 'https://place-hold.it/210x295'" :alt="result.show.name" />
            </figure>
            <div>
              <h3>{{ result.show.name }}</h3>
              <h4>{{ toYearString(result.show.premiered) }}</h4>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { getSearchResults } from '@/services/TvMazeService'
import useDebounce from '@/composables/useDebounce'
import useText from '@/composables/useText'

export default defineComponent({
  setup () {
    const store = useStore()
    const { debounce } = useDebounce()
    const { toYearString } = useText()
    const searchIsFocused = ref(false)
    const fetchedSearchResults = computed(() => store.state.search.results.shows)
    const fetchingSearchResults = computed(() => store.state.search.fetching)

    const onSearchInput = debounce((term: string) => {
      if (term.length < 3) {
        return
      }

      getSearchResults(term, store)
    }, 600)

    const openResults = () => {
      searchIsFocused.value = true
    }

    const closeResults = () => {
      setTimeout(() => {
        searchIsFocused.value = false
      }, 100)
    }

    return {
      toYearString,
      fetchedSearchResults,
      fetchingSearchResults,

      onSearchInput,
      openResults,
      closeResults,
      searchIsFocused
    }
  }
})
</script>

<style lang="scss" scoped>
.search {
  height: 58.5px;
  width: 400px;
  position: relative;

  input {
    height: 100%;
    width: 100%;
    border: 0;
    padding: 10px;
    font-size: 18px;
  }

  .results {
    background: #fff;
    max-height: 310px;
    overflow-y: auto;
    top: 58px;
    left: 0;
    right: 0;
    position: absolute;
    z-index: 10;

    ul {
      li {
        &:nth-child(odd) {
          background-color: #f3f3f3;
        }

        &:hover {
          background-color: #e2e2e2;
        }

        a {
          display: flex;
          text-decoration: none;

          figure {
            height: 100px;
            margin-right: 10px;

            img {
              max-height: 100px;
              width: auto;
              display: block;
            }
          }

          h3 {
            color: #008efd;
            margin-top: 10px;
          }

          h4 {
            color: #9e9e9e;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .search {
    height: 41px;
    width: auto;

    .results {
      top: 41px
    }
  }
}
</style>
