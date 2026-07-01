<template>
  <section class="timer" id="timer">
    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title" style="color: var(--white);">До торжества осталось</h2>
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
  position: relative;
  background: url('/img/ohotnik.webp') center center / cover no-repeat;
  background-attachment: fixed;
  padding: 80px 20px;
  text-align: center;
  color: var(--white);
}

.timer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.55);
}

.timer .container {
  position: relative;
  z-index: 1;
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
  width: 130px;
  height: 130px;
  background: rgba(0,0,0,0.3);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.timer-block:hover {
  transform: scale(1.05);
}

.timer-num {
  font-size: 2.8rem;
  font-weight: 700;
  font-family: 'Playfair Display', serif;
  line-height: 1;
  color: var(--white);
}

.timer-label {
  font-size: 0.8rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 8px;
  font-weight: 500;
  color: var(--white);
}

@media (max-width: 768px) {
  .timer {
    padding: 50px 20px;
  }

  .timer-block {
    width: 90px;
    height: 90px;
  }
  .timer-num {
    font-size: 2rem;
  }
}
</style>
