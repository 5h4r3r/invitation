<template>
  <section class="dress-code" id="dress-code">
    <div class="container">
      <h2 class="section-title fade-in" ref="titleRef">Дресс-код</h2>
      <p class="dress-code-description fade-in" ref="descRef">Элегантный стиль. Просим придерживаться палитры в ваших нарядах:</p>
      <div class="color-palette fade-in" ref="paletteRef">
        <div class="color-swatch">
          <div class="color-circle pink"></div>
          <span class="color-name">Пудровый</span>
        </div>
        <div class="color-swatch">
          <div class="color-circle champagne"></div>
          <span class="color-name">Шампань</span>
        </div>
        <div class="color-swatch">
          <div class="color-circle beige"></div>
          <span class="color-name">Бежевый</span>
        </div>
        <div class="color-swatch">
          <div class="color-circle green"></div>
          <span class="color-name">Тёмно-зелёный</span>
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
.color-swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: default;
}

.color-circle {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.color-swatch:hover .color-circle {
  transform: scale(1.1);
}

.color-circle::after {
  content: '';
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
}

.color-circle::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><filter id="fabric"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23fabric)" opacity="0.2"/></svg>');
  pointer-events: none;
  mix-blend-mode: overlay;
}

.color-circle.pink {
  background: linear-gradient(135deg, #f8e1e4 0%, #e8c4c8 100%);
}

.color-circle.champagne {
  background: linear-gradient(135deg, #f7e7ce 0%, #e8d5b8 100%);
}

.color-circle.green {
  background: linear-gradient(135deg, #4a6741 0%, #3d5636 100%);
}

.color-circle.beige {
  background: linear-gradient(135deg, #d4c4b0 0%, #c4b4a0 100%);
}

.color-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-dark);
}

@media (min-width: 768px) {
  .color-circle {
    width: 100px;
    height: 100px;
  }
}
</style>
