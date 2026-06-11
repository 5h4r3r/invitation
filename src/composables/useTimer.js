import { ref, onUnmounted } from 'vue'

export function useTimer() {
  const days = ref('00')
  const hours = ref('00')
  const minutes = ref('00')
  const seconds = ref('00')

  const weddingDate = new Date('2026-09-12T15:00:00').getTime()

  let intervalId = null

  function updateTimer() {
    const now = new Date().getTime()
    const distance = weddingDate - now

    if (distance > 0) {
      days.value = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0')
      hours.value = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0')
      minutes.value = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
      seconds.value = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')
    }
  }

  function start() {
    updateTimer()
    intervalId = setInterval(updateTimer, 1000)
  }

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })

  return { days, hours, minutes, seconds, start }
}
