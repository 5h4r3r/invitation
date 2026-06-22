<template>
  <section class="schedule" id="schedule">
    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title">Тайминг дня</h2>
      </div>

      <div class="schedule-list">
        <div
          v-for="(item, i) in schedule"
          :key="i"
          class="schedule-item fade-in"
          :ref="el => { if (el) scheduleRefs[i] = el }"
          :style="{ transitionDelay: (100 + i * 100) + 'ms' }"
        >
          <div class="schedule-time">{{ item.time }}</div>
          <div class="schedule-dot"></div>
          <div class="schedule-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const schedule = [
  { time: '14:50', desc: 'Сбор гостей / Трансфер' },
  { time: '15:30', desc: 'Фуршет' },
  { time: '16:00', desc: 'Церемония регистрации' },
  { time: '17:00', desc: 'Свадебный ужин' },
  { time: '22:00', desc: 'Финал официальной части. AfterParty' },
  { time: '23:00', desc: 'Обратный трансфер' },
]

const titleRef = ref(null)
const scheduleRefs = ref([])

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  if (titleRef.value) observer.observe(titleRef.value)
  scheduleRefs.value.forEach(el => { if (el) observer.observe(el) })
})
</script>

<style scoped>
.schedule {
  padding: 96px 20px;
  background: var(--champagne);
}

.schedule-list {
  position: relative;
  margin-top: 64px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.schedule-list::before {
  content: '';
  position: absolute;
  left: 58px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--accent);
  opacity: 0.3;
}

.schedule-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 36px;
  position: relative;
}

.schedule-item:last-child {
  margin-bottom: 0;
}

.schedule-time {
  min-width: 48px;
  text-align: right;
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
  font-family: 'Montserrat', sans-serif;
  padding-top: 2px;
}

.schedule-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  border: 3px solid var(--champagne);
  flex-shrink: 0;
  margin-top: 4px;
  position: relative;
  z-index: 1;
}

.schedule-desc {
  flex: 1;
  font-size: 1rem;
  color: var(--text-dark);
  line-height: 1.5;
  padding-top: 2px;
  font-weight: 400;
}

@media (max-width: 767px) {
  .schedule-list::before {
    left: 44px;
  }

  .schedule-time {
    min-width: 36px;
    font-size: 0.9rem;
  }

  .schedule-desc {
    font-size: 0.9rem;
  }
}
</style>
