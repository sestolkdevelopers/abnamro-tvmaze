import useTvMazeApi, { RawEpisode, RawShow } from '@/composables/useTvMazeApi'
import { Store } from 'vuex'
import { StoreInterface } from '@/store'

export interface GetShowsResponse {
  title: string
  shows: RawShow[]
}

export async function getShows (store: Store<StoreInterface>): Promise<void> {
  const { fetchShows } = useTvMazeApi()
  const genreIndices: {[key: string]: number} = {}
  const genres: GetShowsResponse[] = []

  try {
    store.dispatch('setFetchingShows', true)

    const rawShows = await fetchShows()
    for (const rawShow of rawShows) {
      for (const rawGenre of rawShow.genres) {
        let genreIndex = null
        if (typeof genreIndices[rawGenre] !== 'undefined') {
          genreIndex = genreIndices[rawGenre]
        }

        if (genreIndex === null) {
          genreIndex = genreIndices[rawGenre] = genres.push({
            title: rawGenre,
            shows: []
          }) - 1
        }

        genres[genreIndex].shows.push(rawShow)
      }
    }

    store.commit('setShows', genres)
  } catch (e) {
    let error = e
    if (e instanceof Error) {
      error = e.message
    }

    store.dispatch('setFetchingShowsError', error)
  }

  store.dispatch('setFetchingShows', false)
}

export async function getShow (id: string, store: Store<StoreInterface>): Promise<void> {
  const { fetchShow, fetchShowEpisodes } = useTvMazeApi()

  try {
    store.dispatch('setFetchingShow', true)

    const show = await fetchShow(id)
    const episodes = await fetchShowEpisodes(id)

    const seasons: {[key: number]: RawEpisode[]} = {}
    for (const episode of episodes) {
      if (typeof seasons[episode.season] === 'undefined') {
        seasons[episode.season] = []
      }

      seasons[episode.season].push(episode)
    }

    store.commit('setShow', {
      show,
      seasons
    })
  } catch (e) {
    let error = e
    if (e instanceof Error) {
      error = e.message
    }

    store.dispatch('setFetchingShowError', error)
  }

  store.dispatch('setFetchingShow', false)
}

export async function getSearchResults (term: string, store: Store<StoreInterface>): Promise<void> {
  if (term.length < 3) {
    return
  }

  const { fetchSearchResults } = useTvMazeApi()

  try {
    store.dispatch('setFetchingSearchResults', true)

    const results = await fetchSearchResults(term)

    store.commit('setSearchResults', results)
  } catch (e) {
    let error = e
    if (e instanceof Error) {
      error = e.message
    }

    store.dispatch('setFetchingSearchResultsError', error)
  }

  store.dispatch('setFetchingSearchResults', false)
}
