<template>
  <section class="timeline" id="timeline">
    <div class="container">
      <h2 class="section-title fade-in">Программа дня</h2>
      <div class="timeline-container">
        <div
          v-for="(event, index) in schedule"
          :key="index"
          class="timeline-item fade-in"
          :ref="el => setItemRef(el, index)"
        >
          <div class="timeline-time">{{ event.time }}</div>
          <div class="timeline-event">{{ event.event }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const schedule = [
  { time: '15:00', event: 'Сбор гостей' },
  { time: '16:00', event: 'Церемония бракосочетания' },
  { time: '17:00', event: 'Фуршет' },
  { time: '18:00', event: 'Праздничный ужин' },
  { time: '20:00', event: 'Свадебный торт' },
  { time: '21:00', event: 'Танцы и развлечения' },
]

const itemRefs = ref([])

function setItemRef(el, index) {
  if (el) itemRefs.value[index] = el
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  itemRefs.value.forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>
