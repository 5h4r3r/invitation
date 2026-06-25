<template>
  <section class="rsvp" id="rsvp">
    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title">Подтверждение присутствия</h2>
      </div>

      <div v-if="loading" class="rsvp-card" ref="loadingRef">
        <div class="spinner"></div>
        <p class="rsvp-loading-text">Загрузка...</p>
      </div>

      <div v-else-if="confirmed" class="rsvp-card confirmed-card" ref="confirmedRef">
        <div class="confirmed-icon">&#10003;</div>
        <p class="confirmed-title">Вы подтвердили приглашение!</p>
        <p class="confirmed-sub">Ждём вас 12 сентября 2026</p>
      </div>

      <form v-else class="rsvp-card rsvp-form" ref="formRef" @submit.prevent="handleSubmit">
        <div class="rsvp-form-intro">
          <p>Пожалуйста, заполните форму ниже</p>
        </div>

        <div class="form-group">
          <label>Ваше имя</label>
          <p class="form-guest-name">{{ guestName || 'Гость' }}</p>
        </div>

        <div class="form-group">
          <label>Сможете ли вы присутствовать?</label>
          <div class="rsvp-toggle">
            <button
              type="button"
              class="rsvp-toggle-btn"
              :class="{ active: willAttend === true }"
              @click="willAttend = true"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Да, буду
            </button>
            <button
              type="button"
              class="rsvp-toggle-btn"
              :class="{ active: willAttend === false }"
              @click="willAttend = false"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Нет, не смогу
            </button>
          </div>
        </div>

        <template v-if="willAttend === true">
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
            <label>Нужен ли трансфер?</label>
            <div class="rsvp-toggle rsvp-toggle-row">
              <button
                type="button"
                class="rsvp-toggle-btn rsvp-toggle-btn-half"
                :class="{ active: transferNeeded === true }"
                @click="transferNeeded = true"
              >
                Да
              </button>
              <button
                type="button"
                class="rsvp-toggle-btn rsvp-toggle-btn-half"
                :class="{ active: transferNeeded === false }"
                @click="transferNeeded = false"
              >
                Нет
              </button>
            </div>
          </div>
        </template>

        <div class="form-group">
          <label for="wishes">Пожелания</label>
          <textarea id="wishes" v-model="wishes" placeholder="Ваши пожелания или комментарии..." :disabled="sending" rows="3"></textarea>
        </div>

        <template v-if="willAttend === true">
          <div class="form-group">
            <label for="drink">Предпочтение по алкоголю</label>
            <select id="drink" v-model="drink" :disabled="sending">
              <option value="" disabled>Выберите напиток</option>
              <option v-for="d in drinks" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
        </template>

        <div class="form-group">
          <label>Есть ли аллергия?</label>
          <div class="rsvp-toggle rsvp-toggle-row">
            <button
              type="button"
              class="rsvp-toggle-btn rsvp-toggle-btn-half"
              :class="{ active: hasAllergy === true }"
              @click="hasAllergy = true"
            >
              Да
            </button>
            <button
              type="button"
              class="rsvp-toggle-btn rsvp-toggle-btn-half"
              :class="{ active: hasAllergy === false }"
              @click="hasAllergy = false"
            >
              Нет
            </button>
          </div>
          <input
            v-if="hasAllergy === true"
            v-model="allergyInfo"
            type="text"
            placeholder="Укажите продукты, на которые аллергия"
            class="form-input"
            :disabled="sending"
            style="margin-top: 10px;"
          />
        </div>

        <div class="form-group">
          <label for="comment">Комментарий</label>
          <textarea id="comment" v-model="comment" placeholder="Дополнительные комментарии..." :disabled="sending" rows="2"></textarea>
        </div>

        <input type="text" v-model="botField" class="honeypot" tabindex="-1" autocomplete="off" />

        <button type="submit" class="btn-primary w-full" :disabled="sending || willAttend === null || (willAttend && !drink)">
          {{ sending ? 'Отправка...' : 'Отправить' }}
        </button>

        <p v-if="error" class="form-error">{{ error }}</p>
        <p v-if="apiError && !error" class="form-error">{{ apiError }}</p>
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

const { confirmed, loading, apiError, submitConfirmation, fetchDrinks } = useGuest()

const willAttend = ref(null)
const guests = ref('1')
const drink = ref('')
const drinks = ref([])
const transferNeeded = ref(null)
const wishes = ref('')
const hasAllergy = ref(null)
const allergyInfo = ref('')
const comment = ref('')
const botField = ref('')
const formLoadedAt = ref(0)
const sending = ref(false)
const error = ref('')

const titleRef = ref(null)
const loadingRef = ref(null)
const confirmedRef = ref(null)
const formRef = ref(null)

async function handleSubmit() {
  error.value = ''

  if (botField.value) {
    console.log('🤖 Бот: заполнено honeypot-поле')
    sending.value = false
    return
  }

  const elapsed = Date.now() - formLoadedAt.value
  if (elapsed < 2500) {
    console.log('🤖 Бот: форма отправлена слишком быстро (' + elapsed + 'ms)')
    sending.value = false
    return
  }

  sending.value = true

  const submitGuests = willAttend ? guests.value : '0'
  const submitDrink = willAttend ? drink.value : 'Не пью'
  const submitTransfer = willAttend ? (transferNeeded.value ? 'yes' : 'no') : 'no'
  const submitWishes = wishes.value
  const submitAllergy = hasAllergy.value ? (hasAllergy.value === true ? (allergyInfo.value || 'Да') : 'Нет') : ''
  const submitComment = comment.value

  const result = await submitConfirmation(submitGuests, submitDrink, submitTransfer, submitWishes, submitAllergy, submitComment)
  sending.value = false
  if (!result || result.status !== 'ok') {
    error.value = result?.message || 'Ошибка при отправке. Попробуйте ещё раз.'
  }
}

onMounted(async () => {
  formLoadedAt.value = Date.now()

  const result = await fetchDrinks()
  if (result.length) {
    drinks.value = result
    drink.value = result[0]
  }

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
  position: relative;
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
.form-group select,
.form-group textarea {
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
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
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

/* Toggle buttons */
.rsvp-toggle {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rsvp-toggle-row {
  flex-direction: row;
}

.rsvp-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  border: 2px solid var(--pink);
  border-radius: 12px;
  background: var(--white);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.2s;
}

.rsvp-toggle-btn-half {
  width: 50%;
}

.rsvp-toggle-btn:hover {
  border-color: var(--accent);
  background: rgba(242, 224, 219, 0.2);
}

.rsvp-toggle-btn.active {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--white);
}

.rsvp-toggle-btn.active svg {
  stroke: var(--white);
}

.rsvp-toggle-btn svg {
  stroke: var(--accent);
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

.honeypot {
  position: absolute;
  left: -9999px;
  opacity: 0;
  height: 0;
  width: 0;
  pointer-events: none;
}
</style>
