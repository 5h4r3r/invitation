import { ref } from 'vue'

const API_URL = 'https://script.google.com/macros/s/AKfycbwJhFksNGdQ8kt2HHenomQT02G3G_bWthzV8xEH_l9kBO5AEc5M22GZuRsc_Yqn9zolAg/exec'

const guestName = ref('')
const confirmed = ref(false)
const loading = ref(true)

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
    // Google Script может обернуть ответ в <pre>
    const data = JSON.parse(text.replace(/<[^>]*>/g, ''))
    return data
  } catch (error) {
    console.error('API error:', error)
    return null
  }
}

export function useGuest() {
  async function initGuestName() {
    loading.value = true
    await new Promise(r => setTimeout(r, 0))
    const urlParams = new URLSearchParams(window.location.search)
    let token = urlParams.get('code')
    if (!token) {
      token = localStorage.getItem('weddingToken')
    }
    if (token) {
      localStorage.setItem('weddingToken', token)
      if (urlParams.has('code')) {
        urlParams.delete('code')
        const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '')
        window.history.replaceState({}, document.title, newUrl)
      }
      const data = await api('GET', { token })
      if (data && data.status === 'ok') {
        guestName.value = data.name || ''
        confirmed.value = data.confirmed === true
      }
    }
    loading.value = false
  }

  async function submitConfirmation(guests, drink, transfer, wishes) {
    const urlParams = new URLSearchParams(window.location.search)
    let token = urlParams.get('code')
    if (!token) {
      token = localStorage.getItem('weddingToken')
    }
    if (!token) return null

    const params = { token, action: 'confirm', guests, drink, transfer }
    if (wishes) params.wishes = wishes

    const data = await api('GET', params)
    if (data && data.status === 'ok') {
      confirmed.value = true
    }
    return data
  }

  return { guestName, confirmed, loading, initGuestName, submitConfirmation }
}
