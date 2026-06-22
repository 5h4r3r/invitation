<template>
  <section class="dress-code" id="dress-code">
    <svg class="dress-code-svg" aria-hidden="true">
      <defs>
        <filter id="paper-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise"/>
          <feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="2">
            <feDistantLight azimuth="45" elevation="60"/>
          </feDiffuseLighting>
          <feBlend mode="multiply" in="SourceGraphic" in2="noise"/>
        </filter>
      </defs>
    </svg>

    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title">Дресс-код</h2>
      </div>

      <div class="dc-text fade-in" ref="descRef">
        <p>Мы очень ценим вашу поддержку в создании гармоничной атмосферы нашего праздника. Будем искренне рады, если при выборе праздничного наряда вы отдадите предпочтение палитре оттенков нашей свадьбы:</p>
        <p class="dc-note">Для дам приветствуются коктейльные и вечерние платья, для джентльменов — классические костюмы или элегантный casual.</p>
      </div>

      <div class="dc-colors fade-in" ref="paletteRef">
        <div class="dc-swatch" v-for="c in colors" :key="c.name">
          <div class="dc-circle" :style="{ background: c.gradient }">
            <div class="dc-circle-noise"></div>
            <div class="dc-circle-ring"></div>
          </div>
          <span class="dc-name">{{ c.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const titleRef = ref(null)
const descRef = ref(null)
const paletteRef = ref(null)

const colors = [
  { name: 'Пудровый', gradient: 'linear-gradient(135deg, #f8e1e4, #e8c4c8)' },
  { name: 'Шампань', gradient: 'linear-gradient(135deg, #f7e7ce, #e8d5b8)' },
  { name: 'Бежевый', gradient: 'linear-gradient(135deg, #d4c4b0, #c4b4a0)' },
  { name: 'Тёмно-зелёный', gradient: 'linear-gradient(135deg, #4a6741, #3d5636)' },
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  ;[titleRef.value, descRef.value, paletteRef.value].forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
.dress-code {
  background: var(--white);
  text-align: center;
  position: relative;
}

.dress-code-svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.dc-text {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 24px;
}

.dc-text p {
  font-size: 1.1rem;
  color: var(--text-light);
  line-height: 1.7;
  font-weight: 300;
  margin-bottom: 16px;
}

.dc-note {
  font-style: italic;
  color: var(--text-light);
  opacity: 0.8;
}

.dc-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
}

.dc-swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: default;
}

.dc-swatch:hover .dc-circle {
  transform: scale(1.1);
}

.dc-circle {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dc-circle-noise {
  position: absolute;
  inset: 0;
  opacity: 0.2;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
}

.dc-circle-ring {
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
}

.dc-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-dark);
}

@media (min-width: 768px) {
  .dc-circle {
    width: 100px;
    height: 100px;
  }
}
</style>
