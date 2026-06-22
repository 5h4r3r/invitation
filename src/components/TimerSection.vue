<template>
  <section class="timer" id="timer">
    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title">До торжества осталось</h2>
      </div>

      <div class="timer-grid fade-in" ref="timerRef">
        <div v-for="item in units" :key="item.label" class="timer-block" :style="{ transitionDelay: item.delay }">
          <span class="timer-num">{{ item.value }}</span>
          <span class="timer-label">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTimer } from '../composables/useTimer'

const titleRef = ref(null)
const timerRef = ref(null)

const { days, hours, minutes, seconds, start } = useTimer()

const units = computed(() => [
  { label: 'Дней', value: days.value, delay: '100ms' },
  { label: 'Часов', value: hours.value, delay: '200ms' },
  { label: 'Минут', value: minutes.value, delay: '300ms' },
  { label: 'Секунд', value: seconds.value, delay: '400ms' },
])

onMounted(() => {
  start()

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  ;[titleRef.value, timerRef.value].forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
.timer {
  background: var(--accent);
  color: var(--white);
  text-align: center;
  padding: 80px 20px;
}

.timer :deep(.section-title) {
  color: var(--white);
}

.timer :deep(.section-title::after) {
  background: var(--pink);
}

.timer-grid {
  margin-top: 48px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

.timer-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 120px;
  background: rgba(255,255,255,0.1);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.timer-num {
  font-size: 2.5rem;
  font-weight: 700;
  font-family: 'Playfair Display', serif;
  line-height: 1;
}

.timer-label {
  font-size: 0.8rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 8px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .timer-block {
    width: 80px;
    height: 90px;
  }
  .timer-num {
    font-size: 1.8rem;
  }
}
</style>
