<template>
  <section class="rsvp" id="rsvp">
    <div class="container">
      <h2 class="section-title fade-in">Подтверждение присутствия</h2>

      <div v-if="confirmed" class="confirmed-message fade-in">
        <div class="confirmed-icon">&#10003;</div>
        <p>Вы подтвердили приглашение!</p>
        <p class="confirmed-sub">Ждём вас 12 сентября 2026</p>
      </div>

      <form v-else class="rsvp-form fade-in" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Ваше имя</label>
          <p class="form-guest-name">{{ guestName || 'Гость' }}</p>
        </div>
        <div class="form-group">
          <label for="guests">Количество гостей</label>
          <select id="guests" v-model="guests" :disabled="sending">
            <option value="1">1 гость</option>
            <option value="2">2 гостя</option>
            <option value="3">3 гостя</option>
            <option value="4">4 гостя</option>
          </select>
        </div>
        <div class="form-group">
          <label for="drink">Предпочтение по алкоголю</label>
          <select id="drink" v-model="drink" :disabled="sending">
            <option value="wine">Вино</option>
            <option value="champagne">Шампанское</option>
            <option value="vodka">Водка</option>
            <option value="none">Не пью</option>
          </select>
        </div>
        <button type="submit" class="submit-button" :disabled="sending">
          {{ sending ? 'Отправка...' : 'Отправить' }}
        </button>
        <p v-if="error" class="form-error">{{ error }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useGuest } from '../composables/useGuest'

const props = defineProps({
  guestName: { type: String, default: '' },
})

const { confirmed, submitConfirmation } = useGuest()

const guests = ref('1')
const drink = ref('wine')
const sending = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''
  sending.value = true
  const result = await submitConfirmation(guests.value, drink.value)
  sending.value = false
  if (!result || result.status !== 'ok') {
    error.value = 'Ошибка при отправке. Попробуйте ещё раз.'
  }
}
</script>

<style scoped>
.confirmed-message {
  max-width: 500px;
  margin: 0 auto;
  background: var(--white);
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  text-align: center;
}

.confirmed-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--white);
  font-size: 2rem;
  line-height: 64px;
  margin: 0 auto 20px;
}

.confirmed-message p {
  font-size: 1.3rem;
  color: var(--text-dark);
  font-weight: 500;
}

.confirmed-sub {
  font-size: 1rem !important;
  color: var(--text-light) !important;
  margin-top: 10px;
  font-weight: 300 !important;
}

.form-error {
  color: #d32f2f;
  text-align: center;
  margin-top: 15px;
  font-size: 0.9rem;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
</style>
