<template>
  <section class="love-story" id="love-story">
    <div class="container">
      <h2 class="section-title fade-in" ref="titleRef">Наша история</h2>
      <div class="love-story-content">
        <div class="love-story-text fade-in" ref="textRef">
          <p>Познакомились в парке одним солнечным днём... С первого взгляда поняли — это судьба.</p>
          <p>С тех пор мы неразлучны. Вместе путешествуем, мечтаем и строим нашу любовь день за днём.</p>
          <p>И вот пришло время сказать друг другу "Да" перед самыми близкими людьми.</p>
        </div>
        <div class="love-story-image fade-in" ref="imageRef">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop" alt="Пара">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const titleRef = ref(null)
const textRef = ref(null)
const imageRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  ;[titleRef.value, textRef.value, imageRef.value].forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>
