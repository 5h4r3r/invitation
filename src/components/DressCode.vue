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
