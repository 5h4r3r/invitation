import { ref } from 'vue'

const API_URL = 'https://script.google.com/macros/s/AKfycbzUR7C9QXTv0rU4_JUrd-k98GFxxtJznFaahOiB0Gb55hewfZdE8WcRnip-0ppte9JU/exec'

const guestName = ref('')
const confirmed = ref(false)
const loading = ref(true)
const apiError = ref('')

async function api(method, params) {
  const query = new URLSearchParams(params).toString()
  const url = method === 'POST'
    ? API_URL
    : `${API_URL}${query ? '?' + query : ''}`

  try {
    const response = await fetch(url, method === 'POST'
      ? { method: 'POST', body: query, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      : {})
    const text = await response.text()
    const data = JSON.parse(text.replace(/<[^>]*>/g, ''))
    return data
  } catch (error) {
    console.error('API error:', error)
    return null
  }
}

export function useGuest() {
  function restoreFromStorage() {
    const token = localStorage.getItem('weddingToken')
    const name = localStorage.getItem('weddingName')
    const isConfirmed = localStorage.getItem('weddingConfirmed') === 'true'
    if (token && name) {
      guestName.value = name
      confirmed.value = isConfirmed
      return token
    }
    return null
  }

  function saveToStorage(token, name, isConfirmed) {
    localStorage.setItem('weddingToken', token || '')
    localStorage.setItem('weddingName', name || '')
    localStorage.setItem('weddingConfirmed', isConfirmed ? 'true' : 'false')
  }

  async function initGuestName() {
    apiError.value = ''

    const urlParams = new URLSearchParams(window.location.search)
    const urlToken = urlParams.get('code')

    if (urlToken) {
      // Новый код в URL — загружаем с сервера, перезаписываем storage
      localStorage.setItem('weddingToken', urlToken)
      urlParams.delete('code')
      const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '')
      window.history.replaceState({}, document.title, newUrl)

      const data = await api('GET', { token: urlToken })
      if (data && data.status === 'ok') {
        guestName.value = data.name || ''
        confirmed.value = data.confirmed === true
        saveToStorage(urlToken, guestName.value, confirmed.value)
      } else {
        apiError.value = data?.message || 'API error'
      }
    } else {
      // Нет кода в URL — пробуем storage
      const storedToken = restoreFromStorage()
      if (!storedToken) {
        guestName.value = ''
      }
    }

    loading.value = false
  }

  async function submitConfirmation(guests, drink, transfer, wishes) {
    const storedToken = localStorage.getItem('weddingToken')
    if (!storedToken) return null

    const params = { token: storedToken, action: 'confirm', guests, drink, transfer, wishes }

    const data = await api('GET', params)
    if (data && data.status === 'ok') {
      confirmed.value = true
      saveToStorage(storedToken, guestName.value, true)
    }
    return data
  }

  async function fetchDrinks() {
    const data = await api('GET', { action: 'getDrinks' })
    return data && data.status === 'ok' ? data.drinks : []
  }

  return { guestName, confirmed, loading, apiError, initGuestName, submitConfirmation, fetchDrinks }
}
