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
        <p>Мы очень ценим вашу поддержку в создании гармоничной атмосферы нашего праздника. Будем искренне рады видеть джентльменов в рубашках белого цвета, дам — в приглушённых образах пастельных тонов.</p>
        <p class="dc-note">Ниже представлена палитра цветов нашей свадьбы для вдохновения:</p>
      </div>

      <div class="dc-palette fade-in" ref="paletteRef">
        <div class="dc-row" v-for="(group, gi) in palette" :key="gi">
          <span class="dc-row-label">{{ group.family }}</span>
          <div class="dc-row-colors">
            <div class="dc-swatch" v-for="(hex, ci) in group.colors" :key="ci">
              <div class="dc-circle" :style="{ background: hex }">
                <div class="dc-circle-noise"></div>
                <div class="dc-circle-ring"></div>
              </div>
            </div>
          </div>
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

const palette = [
  { family: 'Зелёные', colors: ['#799386', '#A0C3AB', '#98A997', '#C0CDC4', '#C4D9CA', '#E1EFE2'] },
  { family: 'Песочные', colors: ['#B6894D', '#D9A45E', '#E6BA7B', '#F7CB95', '#E4D2AF', '#F2E3CC'] },
  { family: 'Розовые', colors: ['#B47D83', '#D19B9E', '#DEB4BA', '#F2CBD0', '#F2D9DF', '#F6E7EE'] },
  { family: 'Лиловые', colors: ['#9A7A8F', '#B393A8', '#D8B0CB', '#E7CBE1', '#E6CFE9', '#EDE1ED'] },
  { family: 'Серо-голубые', colors: ['#767A93', '#9CA8C2', '#9A9EA9', '#C4CBD3', '#CBCFD8', '#DDE0E9'] },
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
  color: var(--text-light);
  opacity: 0.8;
}

.dc-palette {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.dc-row {
  display: flex;
  align-items: center;
  gap: 24px;
}

.dc-row-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-light);
  min-width: 120px;
  text-align: right;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
  line-height: 40px;
}

.dc-row-colors {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.dc-swatch {
  cursor: default;
}

.dc-swatch:hover .dc-circle {
  transform: scale(1.15);
}

.dc-circle {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.dc-circle-noise {
  position: absolute;
  inset: 0;
  opacity: 0.15;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
}

.dc-circle-ring {
  position: absolute;
  inset: 3px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
}

@media (min-width: 768px) {
  .dc-circle {
    width: 48px;
    height: 48px;
  }

  .dc-row-label {
    font-size: 0.8rem;
    min-width: 140px;
    line-height: 48px;
  }

  .dc-row-colors {
    gap: 12px;
  }
}
</style>
