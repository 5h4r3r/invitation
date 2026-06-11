<template>
  <section class="hero" id="hero" ref="heroRef">
    <div class="hero-content">
      <p class="guest-name" v-if="guestName">Дорогой(ая) {{ guestName }}!</p>
      <h1>Елизавета <span class="ampersand">&amp;</span> Денис</h1>
      <p class="date">12 сентября 2026</p>
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
