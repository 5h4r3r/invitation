<template>
  <section class="photo-gallery" id="photos">
    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title">Фото со свадьбы</h2>
      </div>

      <div class="photo-card fade-in" ref="cardRef">
        <div class="photo-icon-circle">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>

        <template v-if="link">
          <p class="photo-text">Все фото доступны по ссылке</p>
          <a
            class="btn-primary"
            :href="link"
            target="_blank"
            rel="noopener"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 15V3M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5"/>
            </svg>
            Скачать фото
          </a>
        </template>

        <template v-else>
          <p class="photo-text">Фото появятся после свадьбы</p>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  link: { type: String, default: '' },
})

const titleRef = ref(null)
const cardRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  ;[titleRef.value, cardRef.value].forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
.photo-gallery {
  background: linear-gradient(135deg, var(--pink) 0%, var(--champagne) 100%);
  text-align: center;
}

.photo-card {
  max-width: 500px;
  margin: 0 auto;
  margin-top: 48px;
  background: var(--white);
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  border: 1px solid rgba(242,224,219,0.3);
}

.photo-icon-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(242,224,219,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: var(--accent);
}

.photo-text {
  color: var(--text-light);
  font-size: 1.05rem;
  margin-bottom: 24px;
}
</style>
