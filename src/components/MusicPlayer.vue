<template>
  <section class="music-player" id="music">
    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title">Наш плейлист</h2>
      </div>
      <p class="music-desc fade-in" ref="descRef">{{ label }}</p>
      <div class="player-wrapper fade-in" ref="playerRef">
        <div class="player-card">
          <iframe
            v-for="(track, i) in tracks"
            :key="i"
            frameborder="0"
            allow="clipboard-write; autoplay"
            :src="`https://music.yandex.ru/iframe/album/${track.album}/track/${track.track}`"
            style="border:none;width:100%;height:244px"
            allowfullscreen
            loading="lazy"
          >
          </iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  tracks: { type: Array, default: () => [] },
  label: { type: String, default: '' },
})

const titleRef = ref(null)
const descRef = ref(null)
const playerRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  ;[titleRef.value, descRef.value, playerRef.value].forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
.music-player {
  background: var(--white);
  text-align: center;
}

.music-desc {
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  font-weight: 300;
}

.player-wrapper {
  max-width: 614px;
  margin: 0 auto;
}

.player-card {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(242,224,219,0.3);
  background: var(--white);
}

.player-card iframe {
  display: block;
}
</style>
