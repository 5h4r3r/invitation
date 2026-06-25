<template>
  <nav class="navbar" :class="{ 'nav-scrolled': scrolled }">
    <div class="nav-container">
      <a href="#hero" class="nav-logo">
        <span>Елизавета &amp; Денис</span>
      </a>
      <div class="nav-links">
        <a href="#love-story">История</a>
        <a href="#date-place">Детали</a>
        <a href="#map">Как добраться</a>
        <a href="#dress-code">Дресс-код</a>
        <a href="#timeline">Программа</a>
        <a href="#faq">Вопросы</a>
        <a href="#music" v-if="config.musicPlayer.enabled">Музыка</a>
        <a href="#rsvp" class="nav-rsvp-link">Подтвердить</a>
      </div>
      <button class="nav-toggle" @click="mobileOpen = !mobileOpen" aria-label="Меню">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-mobile" :class="{ open: mobileOpen }">
      <a href="#love-story" @click="mobileOpen = false">История</a>
      <a href="#date-place" @click="mobileOpen = false">Детали</a>
      <a href="#map" @click="mobileOpen = false">Как добраться</a>
      <a href="#dress-code" @click="mobileOpen = false">Дресс-код</a>
      <a href="#timeline" @click="mobileOpen = false">Программа</a>
      <a href="#faq" @click="mobileOpen = false">Вопросы</a>
      <a href="#music" @click="mobileOpen = false" v-if="config.musicPlayer.enabled">Музыка</a>
      <a href="#rsvp" @click="mobileOpen = false" class="nav-rsvp-link">Подтвердить</a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import config from '../config'

const scrolled = ref(false)
const mobileOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 60
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 16px 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background: transparent;
}

.navbar.nav-scrolled {
  background: rgba(253, 248, 245, 0.85);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(242, 224, 219, 0.5);
  padding: 10px 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--white);
  transition: color 0.3s;
}

.nav-scrolled .nav-logo {
  color: var(--text-dark);
}

.nav-links {
  display: none;
  align-items: center;
  gap: 32px;
}

.nav-links a {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  color: rgba(255,255,255,0.9);
  transition: color 0.2s;
}

.nav-scrolled .nav-links a {
  color: var(--text-dark);
}

.nav-links a:hover {
  color: var(--accent);
}

.nav-rsvp-link {
  padding: 8px 20px;
  background: var(--accent);
  color: var(--white) !important;
  border-radius: 50px;
  font-weight: 600 !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.nav-rsvp-link:hover {
  background: var(--accent-hover) !important;
  transform: translateY(-1px);
}

.nav-toggle {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.nav-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--white);
  border-radius: 2px;
  transition: background 0.3s;
}

.nav-scrolled .nav-toggle span {
  background: var(--text-dark);
}

.nav-mobile {
  display: none;
  flex-direction: column;
  gap: 12px;
  padding: 20px 24px;
  background: var(--white);
  border-bottom: 1px solid var(--pink);
}

.nav-mobile.open {
  display: flex;
}

.nav-mobile a {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--text-dark);
  padding: 8px 0;
  border-bottom: 1px solid var(--pink);
}

.nav-mobile a:last-child {
  border-bottom: none;
}

@media (min-width: 1280px) {
  .nav-links {
    display: flex;
  }
  .nav-toggle {
    display: none;
  }
}
</style>
