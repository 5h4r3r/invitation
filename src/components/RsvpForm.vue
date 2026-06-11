<template>
  <section class="rsvp" id="rsvp">
    <div class="container">
      <h2 class="section-title fade-in">Подтверждение присутствия</h2>
      <form class="rsvp-form fade-in" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Ваше имя</label>
          <p class="form-guest-name">{{ guestName || 'Гость' }}</p>
        </div>
        <div class="form-group">
          <label for="guests">Количество гостей</label>
          <select id="guests" v-model="guests">
            <option value="1">1 гость</option>
            <option value="2">2 гостя</option>
            <option value="3">3 гостя</option>
            <option value="4">4 гостя</option>
          </select>
        </div>
        <div class="form-group">
          <label for="drink">Предпочтение по алкоголю</label>
          <select id="drink" v-model="drink">
            <option value="wine">Вино</option>
            <option value="champagne">Шампанское</option>
            <option value="vodka">Водка</option>
            <option value="none">Не пью</option>
          </select>
        </div>
        <button type="submit" class="submit-button">Отправить</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  guestName: { type: String, default: '' }
})

const guests = ref('1')
const drink = ref('wine')

function handleSubmit() {
  alert(`Спасибо, ${guestName || 'Гость'}! Ваше подтверждение получено.`)
  guests.value = '1'
  drink.value = 'wine'
}
</script>
