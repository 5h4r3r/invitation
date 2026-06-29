import { ref } from 'vue'

const API_URL = 'https://script.google.com/macros/s/AKfycby5LH6xmtj-yNlK8a7vGqP1eyxhUVbViHzWtpzjMJTncTfU7O10PuXzTyknC-6mhWJy/exec'

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
    if (!response.ok) {
      console.error('❌ Сервер ответил кодом:', response.status)
      return { status: 'error', message: 'Сервер недоступен (код ' + response.status + ')' }
    }
    const text = await response.text()
    const data = JSON.parse(text.replace(/<[^>]*>/g, ''))
    return data
  } catch (error) {
    console.error('❌ Ошибка сети или парсинга:', error.message || error)
    return { status: 'error', message: 'Ошибка соединения с сервером. Проверьте интернет.' }
  }
}

export function useGuest() {
  function restoreFromStorage() {
    const token = localStorage.getItem('weddingToken')
    const name = localStorage.getItem('weddingName')
    const isConfirmed = localStorage.getItem('weddingConfirmed') === 'true'
    if (token && name) {
      console.log('✅ Гость загружен из localStorage:', name)
      guestName.value = name
      confirmed.value = isConfirmed
      return token
    }
    console.log('ℹ️ Данные гостя не найдены в localStorage')
    return null
  }

  function saveToStorage(token, name, isConfirmed) {
    localStorage.setItem('weddingToken', token || '')
    localStorage.setItem('weddingName', name || '')
    localStorage.setItem('weddingConfirmed', isConfirmed ? 'true' : 'false')
    console.log('✅ Данные гостя сохранены в localStorage:', name)
  }

  async function initGuestName() {
    apiError.value = ''

    const urlParams = new URLSearchParams(window.location.search)
    const urlToken = urlParams.get('code')

    if (urlToken) {
      console.log('🔑 Код из URL:', urlToken)
      localStorage.setItem('weddingToken', urlToken)
      urlParams.delete('code')
      const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '')
      window.history.replaceState({}, document.title, newUrl)

      const data = await api('GET', { token: urlToken })
      if (data && data.status === 'ok') {
        console.log('✅ Гость загружен с сервера:', data.name)
        guestName.value = data.name || ''
        confirmed.value = data.confirmed === true
        saveToStorage(urlToken, guestName.value, confirmed.value)
      } else {
        const msg = data?.message || 'Неизвестная ошибка сервера'
        apiError.value = msg
        console.error('❌ Ошибка загрузки гостя:', msg)
      }
    } else {
      const storedToken = restoreFromStorage()
      if (!storedToken) {
        guestName.value = ''
      }
    }

    loading.value = false
  }

  async function submitConfirmation(guests, drink, transfer, wishes, allergy) {
    const storedToken = localStorage.getItem('weddingToken')
    if (!storedToken) {
      console.error('❌ Нет токена для отправки подтверждения')
      return { status: 'error', message: 'Ошибка авторизации. Откройте ссылку из приглашения.' }
    }

    const params = { token: storedToken, action: 'confirm', guests, transfer, wishes, drink, allergy }
    console.log('📤 Отправка подтверждения:', { guests, drink, transfer, wishes, allergy })

    const data = await api('POST', params)
    if (data && data.status === 'ok') {
      console.log('✅ Подтверждение сохранено')
      confirmed.value = true
      saveToStorage(storedToken, guestName.value, true)
    } else {
      const msg = data?.message || 'Неизвестная ошибка сервера'
      console.error('❌ Ошибка подтверждения:', msg)
    }
    return data
  }

  async function fetchDrinks() {
    const data = await api('GET', { action: 'getDrinks' })
    if (data && data.status === 'ok') {
      console.log('✅ Напитки загружены:', data.drinks)
      return data.drinks
    }
    console.error('❌ Ошибка загрузки напитков:', data?.message || 'нет ответа')
    return []
  }

  return { guestName, confirmed, loading, apiError, initGuestName, submitConfirmation, fetchDrinks }
}
