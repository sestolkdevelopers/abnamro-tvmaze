import axios, { AxiosError } from 'axios'

export interface RawShow extends Record<string, unknown> {
  id: number
  name: string
  genres: string[]
  premiered: string|null
  rating: {
    average: number|null
  }
  image: {
    medium: string
    original: string
  }
  summary: string|null
}

export interface RawEpisode extends Record<string, unknown> {
  id: number
  name: string
  season: number
  number: number
  airstamp: string
  summary: string
}

export default function useTvMazeApi () {
  const fetchShows = async () => {
    try {
      const response = await axios.get('https://api.tvmaze.com/shows')

      return response.data
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        throw new Error(e.response.data)
      }

      throw e
    }
  }

  const fetchShow = async (id: string) => {
    try {
      const response = await axios.get(`https://api.tvmaze.com/shows/${id}`)

      return response.data
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        throw new Error(e.response.data)
      }

      throw e
    }
  }

  const fetchShowEpisodes = async (id: string) => {
    try {
      const response = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`)

      return response.data
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        throw new Error(e.response.data)
      }

      throw e
    }
  }

  const fetchSearchResults = async (term: string) => {
    try {
      const response = await axios.get('https://api.tvmaze.com/search/shows', {
        params: {
          q: term
        }
      })

      return response.data
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        throw new Error(e.response.data)
      }

      throw e
    }
  }

  return {
    fetchShows,
    fetchShow,
    fetchShowEpisodes,
    fetchSearchResults
  }
}
