<template>
  <section class="hero" id="hero" ref="heroRef">
    <div class="hero-bg" ref="bgRef"></div>
    <div class="hero-overlay"></div>
    <div class="hero-gradient-bottom"></div>

    <div class="hero-content">
      <div class="hero-inner">
        <span v-if="loading" class="hero-guest-name hero-guest-name-loading">
          <span class="hero-name-skeleton"></span>
        </span>
        <span v-else class="hero-guest-name">{{ guestName || 'Гость' }},</span>
        <span class="hero-invite-text">Приглашаем вас на свадьбу</span>

        <h1 class="hero-title">
          Елизавета
          <span class="hero-ampersand">&amp;</span>
          Денис
        </h1>

        <div class="hero-date-block">
          <div class="hero-divider"></div>
          <span class="hero-date">12 СЕНТЯБРЯ 2026</span>
          <span class="hero-day">Суббота</span>
          <div class="hero-divider"></div>
        </div>

        <div class="hero-cta-wrapper">
          <a href="#rsvp" class="btn-primary">Подтвердить присутствие</a>
        </div>
      </div>
    </div>

    <div class="hero-scroll-indicator">
      <span>Листайте вниз</span>
      <div class="hero-scroll-line"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  guestName: { type: String, default: '' },
  loading: { type: Boolean, default: false },
})

const heroRef = ref(null)
const bgRef = ref(null)

function onScroll() {
  if (!bgRef.value) return
  const scrolled = window.pageYOffset
  if (scrolled < window.innerHeight) {
    bgRef.value.style.transform = `translateY(${scrolled * 0.4}px)`
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: var(--white);
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: url('/img/ohotnik.jpg') center 30% / cover no-repeat;
  transition: transform 0.075s ease-out;
  will-change: transform;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.hero-gradient-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 128px;
  background: linear-gradient(to top, var(--white) 0%, transparent 100%);
  z-index: 10;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 20;
  text-align: center;
  padding: 0 20px;
  max-width: 56rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-guest-name {
  display: block;
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(255,255,255,0.95);
  letter-spacing: 0.02em;
  margin-bottom: 20px;
  font-family: 'Montserrat', sans-serif;
}

.hero-name-skeleton {
  display: inline-block;
  width: 160px;
  height: 1.3rem;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
  vertical-align: middle;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.hero-invite-text {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(255,255,255,0.85);
  margin-bottom: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}

.hero-title {
  font-size: 3rem;
  line-height: 1.2;
  font-family: 'Playfair Display', serif;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--white);
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  margin: 16px 0;
}

.hero-ampersand {
  display: block;
  font-size: 2.25rem;
  margin: 8px 0;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: rgba(255,255,255,0.8);
}

.hero-date-block {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.hero-divider {
  width: 96px;
  height: 1px;
  background: rgba(255,255,255,0.4);
  margin: 8px 0;
}

.hero-date {
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  font-family: 'Montserrat', sans-serif;
}

.hero-day {
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  font-weight: 300;
  color: rgba(255,255,255,0.7);
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
}

.hero-cta-wrapper {
  margin-top: 40px;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.8;
}

.hero-scroll-indicator span {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--white);
  font-family: 'Montserrat', sans-serif;
}

.hero-scroll-line {
  width: 4px;
  height: 32px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.6);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 4.5rem;
  }
  .hero-ampersand {
    font-size: 3rem;
  }
  .hero-date {
    font-size: 1.5rem;
  }
}
</style>
