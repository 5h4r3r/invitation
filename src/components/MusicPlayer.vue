<template>
  <section class="music-player" id="music">
    <div class="container">
      <h2 class="section-title fade-in">Наш плейлист</h2>
      <p class="music-description fade-in">{{ label }}</p>
      <div class="player-wrapper fade-in">
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
  </section>
</template>

<script setup>
const props = defineProps({
  tracks: { type: Array, default: () => [] },
  label: { type: String, default: '' },
})
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
