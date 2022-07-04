import { createStore } from 'vuex'
import { RawEpisode, RawShow } from '@/composables/useTvMazeApi'

interface ExternalResource<R> {
  fetching: boolean
  error: string | null
  results: R
}

export interface StoreInterface {
  genres: ExternalResource<{
    title: string
    shows: RawShow[]
  }[]>

  show: ExternalResource<{
    show: RawShow | null
    episodes: {
      [key: string]: RawEpisode
    }
  }>

  search: ExternalResource<{
    shows: RawShow[]
  }>
}

type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: unknown
}

type ExternalResources = KeyOfType<StoreInterface, ExternalResource<unknown>>

export default createStore<StoreInterface>({
  state: {
    genres: {
      fetching: false,
      error: null,
      results: []
    },
    show: {
      fetching: false,
      error: null,
      results: {
        show: null,
        episodes: {}
      }
    },
    search: {
      fetching: false,
      error: null,
      results: {
        shows: []
      }
    }
  },
  getters: {
    /**
     * Global flag indicating if anything is being fetched from the external resource
     *
     * @param state
     */
    fetching (state) {
      // Get the first item in the state that has its fetching flag to true
      const keys = Object.keys(state) as ExternalResources[]
      return typeof keys.find((key) => {
        return typeof state[key].fetching !== 'undefined' && state[key].fetching
      }) !== 'undefined'
    }
  },
  mutations: {
    setFetching (state, payload: {
      type: ExternalResources
      fetching: boolean
    }) {
      state[payload.type].fetching = payload.fetching
    },
    setFetchingError (state, payload: {
      type: ExternalResources
      error: string
    }) {
      state[payload.type].error = payload.error
    },
    setShows (state, shows) {
      state.genres.results = shows
    },
    setShow (state, payload) {
      state.show.results = payload
    },
    setSearchResults (state, results) {
      state.search.results.shows = results
    }
  },
  actions: {
    setFetchingShows ({ commit }, fetching) {
      commit('setFetching', { type: 'genres', fetching })
    },
    setFetchingShowsError ({ commit }, error) {
      commit('setFetchingError', { type: 'genres', error })
    },
    setFetchingShow ({ commit }, fetching) {
      commit('setFetching', { type: 'show', fetching })
    },
    setFetchingShowError ({ commit }, error) {
      commit('setFetchingError', { type: 'show', error })
    },
    setFetchingSearchResults ({ commit }, fetching) {
      commit('setFetching', { type: 'search', fetching })
    },
    setFetchingSearchResultsError ({ commit }, error) {
      commit('setFetchingError', { type: 'search', error })
    }
  },
  modules: {}
})
