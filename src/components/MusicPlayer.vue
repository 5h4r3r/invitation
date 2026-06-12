<template>
  <section class="music-player" id="music">
    <div class="container">
      <h2 class="section-title fade-in">Наш плейлист</h2>
      <p class="music-description fade-in">Песня, под которую мы танцуем наш первый танец</p>
      <div class="player-wrapper fade-in">
        <iframe
          frameborder="0"
          allow="clipboard-write; autoplay"
          :src="playerSrc"
          :style="playerStyle"
          allowfullscreen
          loading="lazy"
        >
          Слушайте <a href="https://music.yandex.ru/album/1901380/track/256557">DARE</a> — Gorillaz на Яндекс Музыке
        </iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const playerSrc = 'https://music.yandex.ru/iframe/album/1901380/track/256557'

const playerStyle = computed(() => ({
  border: 'none',
  width: '100%',
  height: '244px',
}))
</script>

<style scoped>
.music-player {
  background: var(--white);
  text-align: center;
}

.music-description {
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.player-wrapper {
  max-width: 614px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.player-wrapper iframe {
  display: block;
}
</style>
