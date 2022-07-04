export default function useDebounce () {
  let handle: number

  return {
    debounce<A = unknown> (handler: (...args: A[]) => void, timeout: number) {
      return (...args: A[]) => {
        clearTimeout(handle)
        handle = setTimeout(() => {
          handler(...args)
        }, timeout)
      }
    }
  }
}
