export default function useText () {
  const toPlainText = (html: string|null): string => {
    if (!html) {
      return ''
    }

    const temp = document.createElement('div')
    temp.innerHTML = html

    return temp.innerText
  }

  const cutOff = (text: string|null, ln: number, suffix = '...'): string => {
    if (!text) {
      return ''
    }

    if (text.length > ln) {
      return text.substring(0, ln) + suffix
    }

    return text
  }

  const toYearString = (timestamp: string|null): string => {
    if (!timestamp || timestamp.length === 0) {
      return ''
    }

    const date = (new Date(timestamp))

    return `${date.getFullYear()}`
  }

  const toDateString = (input: string|null): string => {
    if (!input || input.length === 0) {
      return ''
    }

    const date = (new Date(input))
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const monthNumber = date.getMonth() + 1
    const month = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`

    return `${day}-${month}-${date.getFullYear()}`
  }

  const toDateTimeString = (input: string|null): string => {
    if (!input || input.length === 0) {
      return ''
    }

    const date = (new Date(input))
    const hourNumber = date.getHours() + 1
    const hour = hourNumber < 10 ? `0${hourNumber}` : `${hourNumber}`
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

    return `${toDateString(input)} ${hour}:${minute}`
  }

  return {
    toPlainText,
    cutOff,
    toYearString,
    toDateString,
    toDateTimeString
  }
}
