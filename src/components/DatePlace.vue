<template>
  <section class="date-place" id="date-place">
    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title" style="color: var(--white);">Где и Когда</h2>
      </div>

      <div class="dp-grid">
        <div class="dp-card fade-in" ref="card1Ref" style="transition-delay: 100ms">
          <svg class="dp-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <h3>Дата и время</h3>
          <p>12 сентября 2026 года<br>Сбор гостей в 14:50</p>
        </div>

        <div class="dp-card fade-in" ref="card2Ref" style="transition-delay: 200ms">
          <svg class="dp-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <h3>Место проведения</h3>
          <p>Ресторан «Охотник»<br>г. Курган</p>
          <a href="https://kurgan.wed-expert.com/profiles/ohotnik_2" target="_blank">Подробнее о месте</a>
        </div>

        <div class="dp-card fade-in" ref="card3Ref" style="transition-delay: 300ms">
          <svg class="dp-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
          <h3>Парковка</h3>
          <p>Бесплатная парковка<br>рядом с рестораном</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const titleRef = ref(null)
const card1Ref = ref(null)
const card2Ref = ref(null)
const card3Ref = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  ;[titleRef.value, card1Ref.value, card2Ref.value, card3Ref.value].forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
.date-place {
  position: relative;
  background: url('/img/ohotnik.jpg') center center / cover no-repeat;
  background-attachment: fixed;
  padding: 96px 20px;
}

.date-place::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.55);
}

.date-place .container {
  position: relative;
  z-index: 1;
}

.dp-grid {
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.dp-card {
  flex: 1;
  min-width: 250px;
  text-align: center;
  color: var(--white);
  background: rgba(0,0,0,0.3);
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

.dp-card h3 {
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
  opacity: 0.95;
  font-family: 'Montserrat', sans-serif;
}

.dp-card p {
  font-size: 1.1rem;
  opacity: 0.85;
  line-height: 1.6;
  font-weight: 300;
}

.dp-card a {
  color: var(--white);
  text-decoration: underline;
  font-weight: 500;
  margin-top: 8px;
  font-size: 0.95rem;
}

.dp-card a:hover {
  opacity: 0.8;
}

@media (min-width: 768px) {
  .dp-grid {
    flex-direction: row;
    justify-content: center;
    gap: 40px;
  }

  .dp-card {
    min-width: 250px;
    max-width: 320px;
  }
}
</style>
