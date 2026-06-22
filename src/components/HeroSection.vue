<template>
  <section class="hero" id="hero" ref="heroRef">
    <div class="hero-floating-hearts" aria-hidden="true">
      <svg class="heart heart-1" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
      <svg class="heart heart-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
      <svg class="heart heart-3" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
      <svg class="heart heart-4" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
      <svg class="heart heart-5" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
    </div>
    <div class="hero-content">
      <p class="hero-subtitle" v-if="guestName">Приглашаем вас, {{ guestName }}!</p>
      <p class="hero-subtitle" v-else>Приглашаем вас на свадьбу</p>
      <h1>Елизавета <span class="ampersand">&amp;</span> Денис</h1>
      <p class="date">12 сентября 2026<span class="date-day">&nbsp;&nbsp;Суббота</span></p>
      <a href="#rsvp" class="cta-button">Подтвердить присутствие</a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  guestName: { type: String, default: '' }
})

const heroRef = ref(null)

function onScroll() {
  if (!heroRef.value) return
  const scrolled = window.pageYOffset
  if (scrolled < window.innerHeight) {
    heroRef.value.style.backgroundPosition = `center ${scrolled * 0.5}px`
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.hero-floating-hearts {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}
.heart {
  position: absolute;
  color: rgba(255,255,255,0.15);
  animation: floatHeart 6s ease-in-out infinite;
}
.heart-1 { top: 10%; left: 10%; animation-delay: 0s; }
.heart-2 { top: 20%; right: 15%; animation-delay: 1.5s; }
.heart-3 { bottom: 25%; left: 20%; animation-delay: 3s; }
.heart-4 { top: 50%; right: 10%; animation-delay: 0.8s; }
.heart-5 { bottom: 15%; right: 30%; animation-delay: 2.2s; }
@keyframes floatHeart {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
  50% { transform: translateY(-20px) scale(1.1); opacity: 0.25; }
}
</style>
