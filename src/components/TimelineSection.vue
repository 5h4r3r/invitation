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
          <div class="timeline-event-title">{{ event.event }}</div>
          <div class="timeline-event-desc">{{ event.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const schedule = [
  { time: '15:30', event: 'Сбор гостей', desc: 'Приветственный фуршет, легкая музыка и теплые объятия' },
  { time: '16:00', event: 'Церемония бракосочетания', desc: 'Самый трогательный момент — произнесение клятв' },
  { time: '17:00', event: 'Фуршет и фотосессия', desc: 'Время для поздравлений, объятий и памятных снимков' },
  { time: '18:00', event: 'Праздничный ужин', desc: 'Изысканные угощения, душевные тосты и веселые интерактивы' },
  { time: '21:30', event: 'Свадебный торт', desc: 'Традиционное разрезание торта и уютное чаепитие' },
  { time: '22:00', event: 'Танцы и развлечения', desc: 'Зажигательная музыка и незабываемая атмосфера' },
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

<style scoped>
.timeline-event-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  color: var(--text-dark);
  font-weight: 500;
  margin-top: 4px;
  margin-bottom: 6px;
}

.timeline-event-desc {
  font-size: 0.95rem;
  color: var(--text-light);
  font-weight: 300;
  line-height: 1.6;
}
</style>
