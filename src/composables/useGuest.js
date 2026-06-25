import { ref } from 'vue'

const API_URL = 'https://script.google.com/macros/s/AKfycbzUR7C9QXTv0rU4_JUrd-k98GFxxtJznFaahOiB0Gb55hewfZdE8WcRnip-0ppte9JU/exec'

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

    const params = { token, action: 'confirm', guests, drink, transfer, wishes }

    const data = await api('GET', params)
    if (data && data.status === 'ok') {
      confirmed.value = true
    }
    return data
  }

  async function fetchDrinks() {
    const data = await api('GET', { action: 'getDrinks' })
    return data && data.status === 'ok' ? data.drinks : []
  }

  return { guestName, confirmed, loading, initGuestName, submitConfirmation, fetchDrinks }
}
