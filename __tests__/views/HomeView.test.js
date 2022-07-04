/* eslint-disable @typescript-eslint/no-empty-function */
import { shallowMount } from '@vue/test-utils'
import { useRouter, useRoute } from 'vue-router'
import HomeView from '../../src/views/HomeView.vue'
import store from '@/store'

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(() => ({
    push: () => {}
  }))
}))

test('HomeView renders normally when no shows are retrieved', () => {
  useRoute.mockImplementationOnce(() => ({
    params: {
      id: '1'
    }
  }))
  const push = jest.fn()
  useRouter.mockImplementationOnce(() => ({
    push
  }))

  const wrapper = shallowMount(HomeView, {
    global: {
      plugins: [store],
      stubs: ['router-link', 'router-view']
    }
  })

  expect(wrapper.html()).toContain('<main>')
})
