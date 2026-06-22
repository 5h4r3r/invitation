<template>
  <section class="rsvp" id="rsvp">
    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title">Подтверждение присутствия</h2>
      </div>

      <div v-if="loading" class="rsvp-card fade-in" ref="loadingRef">
        <div class="spinner"></div>
        <p class="rsvp-loading-text">Загрузка...</p>
      </div>

      <div v-else-if="confirmed" class="rsvp-card confirmed-card fade-in" ref="confirmedRef">
        <div class="confirmed-icon">&#10003;</div>
        <p class="confirmed-title">Вы подтвердили приглашение!</p>
        <p class="confirmed-sub">Ждём вас 12 сентября 2026</p>
      </div>

      <form v-else class="rsvp-card rsvp-form fade-in" ref="formRef" @submit.prevent="handleSubmit">
        <div class="rsvp-form-intro">
          <p>Пожалуйста, заполните форму ниже</p>
        </div>

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

        <button type="submit" class="btn-primary w-full" :disabled="sending">
          {{ sending ? 'Отправка...' : 'Отправить' }}
        </button>

        <p v-if="error" class="form-error">{{ error }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGuest } from '../composables/useGuest'

defineProps({
  guestName: { type: String, default: '' },
})

const { confirmed, loading, submitConfirmation } = useGuest()

const guests = ref('1')
const drink = ref('wine')
const sending = ref(false)
const error = ref('')

const titleRef = ref(null)
const loadingRef = ref(null)
const confirmedRef = ref(null)
const formRef = ref(null)

async function handleSubmit() {
  error.value = ''
  sending.value = true
  const result = await submitConfirmation(guests.value, drink.value)
  sending.value = false
  if (!result || result.status !== 'ok') {
    error.value = 'Ошибка при отправке. Попробуйте ещё раз.'
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  ;[titleRef.value, loadingRef.value, confirmedRef.value, formRef.value].forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
.rsvp {
  background: linear-gradient(135deg, var(--pink) 0%, var(--champagne) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rsvp .container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rsvp-card {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  margin-top: 48px;
  background: var(--white);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  border: 1px solid rgba(242,224,219,0.3);
}

.rsvp-form-intro {
  text-align: center;
  margin-bottom: 24px;
}

.rsvp-form-intro p {
  font-size: 0.85rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
}

.confirmed-card {
  text-align: center;
  padding: 60px 40px;
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

.confirmed-title {
  font-size: 1.3rem;
  color: var(--text-dark);
  font-weight: 500;
}

.confirmed-sub {
  font-size: 1rem;
  color: var(--text-light);
  margin-top: 10px;
  font-weight: 300;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-dark);
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid var(--pink);
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  transition: border-color 0.2s;
  background: var(--white);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--accent);
}

.form-guest-name {
  font-size: 1.1rem;
  color: var(--accent);
  font-weight: 500;
  padding: 12px 0;
}

.form-error {
  color: #d32f2f;
  text-align: center;
  margin-top: 15px;
  font-size: 0.9rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--pink);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.rsvp-loading-text {
  color: var(--text-light);
  font-size: 0.95rem;
  text-align: center;
}
</style>
