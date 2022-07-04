import useTvMazeApi from '@/composables/useTvMazeApi'
import { getShows, getShow, getSearchResults } from '@/services/TvMazeService'

const commitMock = jest.fn()
const dispatchMock = jest.fn()
const storeMock = jest.fn(() => ({
  commit: commitMock,
  dispatch: dispatchMock
}))

jest.mock('@/composables/useTvMazeApi', () => ({
  __esModule: true,
  default: jest.fn()
}))

describe('getShows is handled correctly', () => {
  beforeEach(() => {
    commitMock.mockClear()
    dispatchMock.mockClear()
    storeMock.mockClear()
    useTvMazeApi.mockClear()
  })

  test('getShows throws an error when request fails', async () => {
    const fetchShowsMock = jest.fn(() => {
      throw new Error('Request has failed')
    })

    useTvMazeApi.mockImplementationOnce(() => ({
      fetchShows: fetchShowsMock
    }))

    await getShows(storeMock())

    expect(storeMock.mock.calls.length).toBe(1)
    expect(fetchShowsMock.mock.calls.length).toBe(1)
    expect(dispatchMock.mock.calls.length).toBe(3)
    expect(dispatchMock.mock.calls[0][0]).toBe('setFetchingShows')
    expect(dispatchMock.mock.calls[0][1]).toBeTruthy()
    expect(dispatchMock.mock.calls[1][0]).toBe('setFetchingShowsError')
    expect(dispatchMock.mock.calls[1][1]).toBe('Request has failed')
    expect(dispatchMock.mock.calls[2][0]).toBe('setFetchingShows')
    expect(dispatchMock.mock.calls[2][1]).toBeFalsy()
  })

  test('getShows handles an empty response', async () => {
    const fetchShowsMock = jest.fn(() => [])

    useTvMazeApi.mockImplementationOnce(() => ({
      fetchShows: fetchShowsMock
    }))

    await getShows(storeMock())

    expect(storeMock.mock.calls.length).toBe(1)
    expect(fetchShowsMock.mock.calls.length).toBe(1)
    expect(dispatchMock.mock.calls.length).toBe(2)
    expect(dispatchMock.mock.calls[0][0]).toBe('setFetchingShows')
    expect(dispatchMock.mock.calls[0][1]).toBeTruthy()
    expect(commitMock.mock.calls.length).toBe(1)
    expect(commitMock.mock.calls[0][0]).toBe('setShows')
    expect(commitMock.mock.calls[0][1]).toEqual([])
    expect(dispatchMock.mock.calls[1][0]).toBe('setFetchingShows')
    expect(dispatchMock.mock.calls[1][1]).toBeFalsy()
  })

  test('getShows handles a valid response and groups shows per genre', async () => {
    const show1 = {
      id: 1,
      name: 'Test 1',
      genres: ['Genre 1']
    }
    const show2 = {
      id: 2,
      name: 'Test 2',
      genres: ['Genre 1']
    }
    const show3 = {
      id: 3,
      name: 'Test 3',
      genres: ['Genre 2']
    }
    const fetchShowsMock = jest.fn(() => [
      { ...show1 },
      { ...show2 },
      { ...show3 }
    ])

    useTvMazeApi.mockImplementationOnce(() => ({
      fetchShows: fetchShowsMock
    }))

    await getShows(storeMock())

    expect(storeMock.mock.calls.length).toBe(1)
    expect(fetchShowsMock.mock.calls.length).toBe(1)
    expect(dispatchMock.mock.calls.length).toBe(2)
    expect(dispatchMock.mock.calls[0][0]).toBe('setFetchingShows')
    expect(dispatchMock.mock.calls[0][1]).toBeTruthy()
    expect(commitMock.mock.calls.length).toBe(1)
    expect(commitMock.mock.calls[0][0]).toBe('setShows')
    expect(commitMock.mock.calls[0][1]).toEqual([
      {
        title: 'Genre 1',
        shows: [
          { ...show1 },
          { ...show2 }
        ]
      },
      {
        title: 'Genre 2',
        shows: [
          { ...show3 }
        ]
      }
    ])
    expect(dispatchMock.mock.calls[1][0]).toBe('setFetchingShows')
    expect(dispatchMock.mock.calls[1][1]).toBeFalsy()
  })
})

describe('getShow is handled correctly', () => {
  beforeEach(() => {
    commitMock.mockClear()
    dispatchMock.mockClear()
    storeMock.mockClear()
    useTvMazeApi.mockClear()
  })

  test('getShow fetchShow throws an error when request fails', async () => {
    const fetchShowMock = jest.fn(() => {
      throw new Error('Request has failed')
    })

    useTvMazeApi.mockImplementationOnce(() => ({
      fetchShow: fetchShowMock
    }))

    await getShow('1', storeMock())

    expect(storeMock.mock.calls.length).toBe(1)
    expect(fetchShowMock.mock.calls.length).toBe(1)
    expect(dispatchMock.mock.calls.length).toBe(3)
    expect(dispatchMock.mock.calls[0][0]).toBe('setFetchingShow')
    expect(dispatchMock.mock.calls[0][1]).toBeTruthy()
    expect(dispatchMock.mock.calls[1][0]).toBe('setFetchingShowError')
    expect(dispatchMock.mock.calls[1][1]).toBe('Request has failed')
    expect(dispatchMock.mock.calls[2][0]).toBe('setFetchingShow')
    expect(dispatchMock.mock.calls[2][1]).toBeFalsy()
  })

  test('getShow fetchShowEpisodesMock throws an error when request fails', async () => {
    const fetchShowMock = jest.fn(() => [])
    const fetchShowEpisodesMock = jest.fn(() => {
      throw new Error('Request has failed')
    })

    useTvMazeApi.mockImplementationOnce(() => ({
      fetchShow: fetchShowMock,
      fetchShowEpisodes: fetchShowEpisodesMock
    }))

    await getShow('1', storeMock())

    expect(storeMock.mock.calls.length).toBe(1)
    expect(fetchShowMock.mock.calls.length).toBe(1)
    expect(fetchShowEpisodesMock.mock.calls.length).toBe(1)
    expect(dispatchMock.mock.calls.length).toBe(3)
    expect(dispatchMock.mock.calls[0][0]).toBe('setFetchingShow')
    expect(dispatchMock.mock.calls[0][1]).toBeTruthy()
    expect(dispatchMock.mock.calls[1][0]).toBe('setFetchingShowError')
    expect(dispatchMock.mock.calls[1][1]).toBe('Request has failed')
    expect(dispatchMock.mock.calls[2][0]).toBe('setFetchingShow')
    expect(dispatchMock.mock.calls[2][1]).toBeFalsy()
  })

  test('getShow handles an empty response', async () => {
    const fetchShowMock = jest.fn(() => [])
    const fetchShowEpisodesMock = jest.fn(() => [])

    useTvMazeApi.mockImplementationOnce(() => ({
      fetchShow: fetchShowMock,
      fetchShowEpisodes: fetchShowEpisodesMock
    }))

    await getShow('1', storeMock())

    expect(storeMock.mock.calls.length).toBe(1)
    expect(fetchShowMock.mock.calls.length).toBe(1)
    expect(dispatchMock.mock.calls.length).toBe(2)
    expect(dispatchMock.mock.calls[0][0]).toBe('setFetchingShow')
    expect(dispatchMock.mock.calls[0][1]).toBeTruthy()
    expect(commitMock.mock.calls.length).toBe(1)
    expect(commitMock.mock.calls[0][0]).toBe('setShow')
    expect(commitMock.mock.calls[0][1]).toEqual({ seasons: {}, show: [] })
    expect(dispatchMock.mock.calls[1][0]).toBe('setFetchingShow')
    expect(dispatchMock.mock.calls[1][1]).toBeFalsy()
  })
})

describe('getSearchResults is handled correctly', () => {
  beforeEach(() => {
    commitMock.mockClear()
    dispatchMock.mockClear()
    storeMock.mockClear()
    useTvMazeApi.mockClear()
  })

  test('getSearchResults throws an error when request fails', async () => {
    const fetchSearchResultsMock = jest.fn(() => {
      throw new Error('Request has failed')
    })

    useTvMazeApi.mockImplementationOnce(() => ({
      fetchSearchResults: fetchSearchResultsMock
    }))

    await getSearchResults('search-me', storeMock())

    expect(storeMock.mock.calls.length).toBe(1)
    expect(fetchSearchResultsMock.mock.calls.length).toBe(1)
    expect(dispatchMock.mock.calls.length).toBe(3)
    expect(dispatchMock.mock.calls[0][0]).toBe('setFetchingSearchResults')
    expect(dispatchMock.mock.calls[0][1]).toBeTruthy()
    expect(dispatchMock.mock.calls[1][0]).toBe('setFetchingSearchResultsError')
    expect(dispatchMock.mock.calls[1][1]).toBe('Request has failed')
    expect(dispatchMock.mock.calls[2][0]).toBe('setFetchingSearchResults')
    expect(dispatchMock.mock.calls[2][1]).toBeFalsy()
  })

  test('getSearchResults handles an empty response', async () => {
    const fetchSearchResultsMock = jest.fn(() => [])

    useTvMazeApi.mockImplementationOnce(() => ({
      fetchSearchResults: fetchSearchResultsMock
    }))

    await getSearchResults('search-me', storeMock())

    expect(storeMock.mock.calls.length).toBe(1)
    expect(fetchSearchResultsMock.mock.calls.length).toBe(1)
    expect(dispatchMock.mock.calls.length).toBe(2)
    expect(dispatchMock.mock.calls[0][0]).toBe('setFetchingSearchResults')
    expect(dispatchMock.mock.calls[0][1]).toBeTruthy()
    expect(commitMock.mock.calls.length).toBe(1)
    expect(commitMock.mock.calls[0][0]).toBe('setSearchResults')
    expect(commitMock.mock.calls[0][1]).toEqual([])
    expect(dispatchMock.mock.calls[1][0]).toBe('setFetchingSearchResults')
    expect(dispatchMock.mock.calls[1][1]).toBeFalsy()
  })

  test('getSearchResults handles a valid response', async () => {
    const show1 = {
      score: 0.45353,
      show: {
        id: 1,
        name: 'Test 1',
        genres: ['Genre 1']
      }
    }
    const show2 = {
      score: 0.456463,
      show: {
        id: 2,
        name: 'Test 2',
        genres: ['Genre 1']
      }
    }
    const show3 = {
      score: 0.67542,
      show: {
        id: 3,
        name: 'Test 3',
        genres: ['Genre 2']
      }
    }
    const fetchSearchResultsMock = jest.fn(() => [
      { ...show1 },
      { ...show2 },
      { ...show3 }
    ])

    useTvMazeApi.mockImplementationOnce(() => ({
      fetchSearchResults: fetchSearchResultsMock
    }))

    await getSearchResults('search-me', storeMock())

    expect(storeMock.mock.calls.length).toBe(1)
    expect(fetchSearchResultsMock.mock.calls.length).toBe(1)
    expect(dispatchMock.mock.calls.length).toBe(2)
    expect(dispatchMock.mock.calls[0][0]).toBe('setFetchingSearchResults')
    expect(dispatchMock.mock.calls[0][1]).toBeTruthy()
    expect(commitMock.mock.calls.length).toBe(1)
    expect(commitMock.mock.calls[0][0]).toBe('setSearchResults')
    expect(commitMock.mock.calls[0][1]).toEqual([
      { ...show1 },
      { ...show2 },
      { ...show3 }
    ])
    expect(dispatchMock.mock.calls[1][0]).toBe('setFetchingSearchResults')
    expect(dispatchMock.mock.calls[1][1]).toBeFalsy()
  })
})
