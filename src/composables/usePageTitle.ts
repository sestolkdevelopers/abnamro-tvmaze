import { useRoute } from 'vue-router'

export default function usePageTitle () {
  const setPageTitle = (title?: string|string[]) => {
    const route = useRoute()
    const stack = []

    if (title) {
      stack.push(...(Array.isArray(title) ? title : [title]))
    }
    stack.push(route.meta.title)
    // Should/Could be placed in the .env but for sake of simplicity I set it here
    stack.push('ABN Amro Assignment')

    document.title = stack.join(' | ')
  }

  return {
    setPageTitle
  }
}
