<template>
  <section class="map-section" id="map">
    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title">Как добраться</h2>
      </div>

      <div class="map-info fade-in" ref="infoRef">
        <p>Ресторан «Охотник» находится по адресу: <strong>Курганская обл., д. Лукино, пер. Тайный, 7</strong>.</p>
        <p class="map-hint">Вы можете добраться на личном автомобиле или такси. Для гостей будет организован трансфер.</p>
        <a
          class="map-button"
          href="https://yandex.ru/maps/?ll=65.417798%2C55.357972&pt=65.417798%2C55.357972&z=16"
          target="_blank"
          rel="noopener"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Открыть в Яндекс.Картах
        </a>
      </div>

      <div class="map-wrapper fade-in" ref="mapRef">
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const titleRef = ref(null)
const infoRef = ref(null)
const mapRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  ;[titleRef.value, infoRef.value, mapRef.value].forEach(el => {
    if (el) observer.observe(el)
  })

  if (!mapRef.value) return
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.charset = 'utf-8'
  script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Af5164dfd684f78eb88a094017f1ad82fc9086f18d1a9449c0444ec59e2b4e898&width=100%25&height=400&lang=ru_RU&scroll=true'
  mapRef.value.appendChild(script)
})
</script>

<style scoped>
.map-section {
  background: var(--white);
}

.map-info {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.map-info p {
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 8px;
  font-weight: 300;
  line-height: 1.7;
}

.map-info strong {
  color: var(--text-dark);
  font-weight: 600;
}

.map-hint {
  margin-bottom: 24px !important;
}

.map-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: var(--accent);
  color: var(--white);
  text-decoration: none;
  border-radius: 50px;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(212, 168, 142, 0.3);
}

.map-button:hover {
  background: var(--accent-hover);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(196, 147, 120, 0.4);
}

.map-button:active {
  transform: translateY(-1px);
}

.map-wrapper {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(242,224,219,0.3);
}

.map-wrapper :deep(div) {
  width: 100% !important;
}
</style>
