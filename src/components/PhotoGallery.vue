<template>
  <section class="photo-gallery" id="photos">
    <div class="container">
      <h2 class="section-title fade-in">Фото со свадьбы</h2>
      <div class="photo-card fade-in">
        <div class="photo-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>

        <template v-if="link">
          <p class="photo-text">Все фото доступны по ссылке</p>
          <a
            class="photo-button"
            :href="link"
            target="_blank"
            rel="noopener"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.5 3a1.5 1.5 0 0 1 1.5 1.5v5.75a.75.75 0 0 1-1.5 0V5.62l-5.69 5.69a.75.75 0 0 1-1.06-1.06L13.44 4.5H9.75a.75.75 0 0 1 0-1.5h4.75zM4.5 8.75A.75.75 0 0 1 5.25 8H8a.75.75 0 0 1 0 1.5H6v9.75h12V9.5h-2a.75.75 0 0 1 0-1.5h2.75a.75.75 0 0 1 .75.75v11a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V8.75z"/>
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
defineProps({
  link: { type: String, default: '' },
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
  background: var(--white);
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.photo-icon {
  color: var(--accent);
  margin-bottom: 20px;
}

.photo-text {
  color: var(--text-light);
  font-size: 1.05rem;
  margin-bottom: 24px;
}

.photo-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  background: var(--accent);
  color: var(--white);
  text-decoration: none;
  border-radius: 50px;
  font-weight: 500;
  font-size: 1.05rem;
  transition: all 0.3s ease;
}

.photo-button:hover {
  background: #6d5548;
  transform: translateY(-2px);
}
</style>
