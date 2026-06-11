import { ref } from 'vue'

const API_URL = 'https://script.google.com/macros/s/AKfycbyd61CwRGy0aInI9IsN_Rr5tWZXggucgXFClijc5eXJsAvry-ZdHiUjgkNjJc7wQMxmtw/exec'

const guestName = ref('')

async function fetchGuestName(token) {
  try {
    const response = await fetch(`${API_URL}?token=${encodeURIComponent(token)}`)
    const data = await response.json()
    if (data.status === 'ok' && data.name) {
      return data.name
    }
    return null
  } catch (error) {
    console.error('Error fetching guest name:', error)
    return null
  }
}

export function useGuest() {
  async function initGuestName() {
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
      const name = await fetchGuestName(token)
      if (name) {
        guestName.value = name
      }
    }
  }

  return { guestName, initGuestName }
}
