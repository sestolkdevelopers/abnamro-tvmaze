import { ref } from 'vue'
import axios, { AxiosError, AxiosRequestConfig, CancelTokenSource } from 'axios'

export default function useApi (config: AxiosRequestConfig) {
  const loading = ref(false)
  const error = ref<AxiosError|null>(null)
  const result = ref(null)
  const cancelToken: CancelTokenSource = axios.CancelToken.source()

  const request = () => {
    loading.value = true

    axios(config)
      .then((response) => {
        result.value = response.data
      })
      .catch((errorResponse) => {
        error.value = errorResponse
      })
      .finally(() => {
        loading.value = false
      })
  }

  const cancel = (message?: string) => {
    cancelToken.cancel(message)
    loading.value = false
  }

  return {
    loading,
    error,
    result,

    request,
    cancel
  }
}
