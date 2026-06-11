<template>
  <section class="timer" id="timer">
    <div class="container">
      <h2 class="section-title">До свадьбы осталось</h2>
      <div class="timer-display">
        <div class="timer-item">
          <div class="timer-value">{{ days }}</div>
          <div class="timer-label">Дней</div>
        </div>
        <div class="timer-item">
          <div class="timer-value">{{ hours }}</div>
          <div class="timer-label">Часов</div>
        </div>
        <div class="timer-item">
          <div class="timer-value">{{ minutes }}</div>
          <div class="timer-label">Минут</div>
        </div>
        <div class="timer-item">
          <div class="timer-value">{{ seconds }}</div>
          <div class="timer-label">Секунд</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTimer } from '../composables/useTimer'

const { days, hours, minutes, seconds, start } = useTimer()

onMounted(() => {
  start()
})
</script>
