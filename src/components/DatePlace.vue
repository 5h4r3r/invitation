<template>
  <section class="date-place" id="date-place">
    <div class="container">
      <div class="date-place-content">
        <div class="date-place-item fade-in" ref="item1">
          <svg class="dp-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <h3>Дата</h3>
          <p><strong>12 сентября 2026 года</strong></p>
          <p>Суббота</p>
        </div>
        <div class="date-place-item fade-in" ref="item2">
          <svg class="dp-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <h3>Место</h3>
          <p><strong>Ресторан «Охотник»</strong></p>
          <p>г. Курган</p>
          <p><a href="https://kurgan.wed-expert.com/profiles/ohotnik_2" target="_blank">Подробнее о месте</a></p>
        </div>
        <div class="date-place-item fade-in" ref="item3">
          <svg class="dp-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
          <h3>Парковка</h3>
          <p>Бесплатная парковка рядом с рестораном</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const item1 = ref(null)
const item2 = ref(null)
const item3 = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  ;[item1.value, item2.value, item3.value].forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
.date-place-item {
  flex: 1;
  min-width: 250px;
  text-align: center;
  color: var(--white);
  background: rgba(0,0,0,0.25);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  padding: 32px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dp-icon {
  color: var(--accent);
  margin-bottom: 16px;
  opacity: 0.9;
}

.date-place-item h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  opacity: 0.95;
}

.date-place-item p {
  font-size: 1rem;
  opacity: 0.85;
}

.date-place-item a {
  color: var(--white);
  text-decoration: underline;
  font-weight: 500;
}

.date-place-item a:hover {
  opacity: 0.8;
}
</style>
