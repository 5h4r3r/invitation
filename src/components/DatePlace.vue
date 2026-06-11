<template>
  <section class="date-place" id="date-place">
    <div class="container">
      <div class="date-place-content">
        <div class="date-place-item fade-in" ref="item1">
          <h3>Дата</h3>
          <p><strong>12 сентября 2026 года</strong></p>
          <p>Суббота</p>
        </div>
        <div class="date-place-item fade-in" ref="item2">
          <h3>Место</h3>
          <p><strong>Ресторан «Охотник»</strong></p>
          <p>г. Курган</p>
          <p><a href="https://kurgan.wed-expert.com/profiles/ohotnik_2" target="_blank">Подробнее о месте</a></p>
        </div>
        <div class="date-place-item fade-in" ref="item3">
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
