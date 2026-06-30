<template>
  <section class="map-section" id="map">
    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title">Как добраться</h2>
      </div>

      <div class="map-info fade-in" ref="infoRef">
        <p>Можно добраться на личном транспорте к фуршету в 15:30.</p>
        <p>Ресторан «Охотник» находится по адресу: <strong>Курганская обл., д. Лукино, пер. Тайный, 7</strong>.</p>
        <p class="map-hint">Для гостей также будет организован трансфер, сбор в 14:50 у парковки ТРЦ «Воробьёвы Горы».</p>
      </div>

      <div class="map-grid">
        <div class="map-wrapper fade-in" ref="mapTransferRef">
          <p class="map-label">Парковка у Воробьёвых Гор</p>
        </div>
        <div class="map-wrapper fade-in" ref="mapRef">
          <p class="map-label">Ресторан «Охотник»</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const titleRef = ref(null)
const infoRef = ref(null)
const mapRef = ref(null)
const mapTransferRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  ;[titleRef.value, infoRef.value, mapRef.value, mapTransferRef.value].forEach(el => {
    if (el) observer.observe(el)
  })

  function loadMap(container, src) {
    if (!container) return
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.src = src
    container.appendChild(script)
  }

  loadMap(mapRef.value, 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Af5164dfd684f78eb88a094017f1ad82fc9086f18d1a9449c0444ec59e2b4e898&width=100%25&height=400&lang=ru_RU&scroll=true')
  loadMap(mapTransferRef.value, 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A93395cdf314d0cda75e31b1ec7ad4e4e841336f5452a65dc483a3d64a503f738&width=100%25&height=400&lang=ru_RU&scroll=true')
})
</script>

<style scoped>
.map-section {
  background: #DDE0E9;
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

.map-label {
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-light);
  padding: 12px 0 0;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.map-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
}

@media (min-width: 768px) {
  .map-grid {
    flex-direction: row;
  }

  .map-wrapper {
    flex: 1;
    min-width: 0;
  }
}
</style>
