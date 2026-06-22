<template>
  <section class="faq" id="faq">
    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title">Частые вопросы</h2>
      </div>

      <div class="faq-list fade-in" ref="listRef">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="faq-item"
          :class="{ open: openIndex === index }"
        >
          <button class="faq-question" @click="toggle(index)">
            <span class="faq-q-text">{{ item.q }}</span>
            <span class="faq-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </button>
          <div class="faq-answer" v-show="openIndex === index">
            <p>{{ item.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const titleRef = ref(null)
const listRef = ref(null)
const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}

const items = [
  { q: 'Будет ли трансфер?', a: 'Да, мы организуем трансфер для гостей. Подробности сообщим ближе к дате.' },
  { q: 'Есть ли парковка?', a: 'Да, рядом с рестораном есть бесплатная парковка.' },
  { q: 'Что дарить?', a: 'Самым лучшим подарком для нас будет ваше присутствие. Если хотите поздравить нас материально — мы будем рады денежному подарку.' },
  { q: 'Можно ли с детьми?', a: 'К сожалению, мы не сможем принять детей. Пожалуйста, воспользуйтесь услугами няни заранее.' },
  { q: 'Будет ли фотограф?', a: 'Да, у нас будет профессиональный фотограф. Все фото вы сможете получить после свадьбы.' },
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  ;[titleRef.value, listRef.value].forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
.faq {
  background: linear-gradient(135deg, var(--pink) 0%, var(--champagne) 100%);
}

.faq-list {
  max-width: 700px;
  margin: 0 auto;
  margin-top: 48px;
}

.faq-item {
  background: var(--white);
  border-radius: 16px;
  margin-bottom: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  overflow: hidden;
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--text-dark);
  text-align: left;
  transition: background 0.2s;
}

.faq-question:hover {
  background: rgba(212, 168, 142, 0.06);
}

.faq-q-text {
  flex: 1;
}

.faq-arrow {
  flex-shrink: 0;
  margin-left: 16px;
  color: var(--accent);
  transition: transform 0.3s ease;
}

.faq-item.open .faq-arrow {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 24px 18px;
  font-size: 0.95rem;
  color: var(--text-light);
  line-height: 1.7;
}
</style>
