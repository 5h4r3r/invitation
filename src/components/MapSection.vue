<template>
  <section class="map-section" id="map">
    <div class="container">
      <h2 class="section-title fade-in">Как добраться</h2>

      <div class="map-info fade-in">
        <p><strong>Ресторан «Охотник»</strong></p>
        <p>Курганская обл., д. Лукино, пер. Тайный, 7</p>
        <a
          class="map-button"
          href="https://yandex.ru/maps/?ll=65.417798%2C55.357972&pt=65.417798%2C55.357972&z=16"
          target="_blank"
          rel="noopener"
        >
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

const mapRef = ref(null)

onMounted(() => {
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
  margin-bottom: 2rem;
}

.map-info p {
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.map-info strong {
  color: var(--text-dark);
}

.map-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 12px 30px;
  background: var(--accent);
  color: var(--white);
  text-decoration: none;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.map-button:hover {
  background: #b09470;
  transform: translateY(-2px);
}

.map-wrapper {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.map-wrapper :deep(div) {
  width: 100% !important;
}
</style>
