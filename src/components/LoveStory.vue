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
          <div class="love-story-image-bg"></div>
          <img src="/img/story-photo.webp" alt="Пара">
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

<style scoped>
.love-story-image {
  flex: 1;
  position: relative;
  border-radius: 20px;
  overflow: visible;
}

.love-story-image-bg {
  position: absolute;
  inset: -16px;
  border-radius: 24px;
  background: var(--pink);
  opacity: 0.4;
  transform: rotate(-2deg);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}

.love-story-image:hover .love-story-image-bg {
  transform: rotate(0deg);
}

.love-story-image img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.love-story-image:hover img {
  transform: scale(1.02);
}
</style>
