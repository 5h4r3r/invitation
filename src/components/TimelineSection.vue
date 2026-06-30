<template>
  <section class="timeline" id="timeline">
    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title">Программа дня</h2>
      </div>

      <div class="tl-container fade-in" ref="tlRef">
        <div class="tl-line"></div>

        <div
          v-for="(event, index) in schedule"
          :key="index"
          class="tl-item"
          :class="index % 2 === 1 ? 'tl-right' : 'tl-left'"
        >
          <div class="tl-dot"></div>

          <div class="tl-card tl-card-left" v-if="index % 2 === 0">
            <div class="fade-in" :ref="el => setItemRef(el, index)" :style="{ transitionDelay: '150ms' }">
              <span class="tl-time">{{ event.time }}</span>
              <h3 class="tl-title">{{ event.title }}</h3>
              <p class="tl-desc">{{ event.desc }}</p>
            </div>
          </div>

          <div class="tl-spacer"></div>

          <div class="tl-card tl-card-right" v-if="index % 2 === 1">
            <div class="fade-in" :ref="el => setItemRef(el, index)" :style="{ transitionDelay: '150ms' }">
              <span class="tl-time">{{ event.time }}</span>
              <h3 class="tl-title">{{ event.title }}</h3>
              <p class="tl-desc">{{ event.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const titleRef = ref(null)
const tlRef = ref(null)

const schedule = [
  { time: '14:50', title: 'Сбор гостей / Трансфер', desc: 'Встреча гостей, посадка в трансфер' },
  { time: '15:30', title: 'Фуршет', desc: 'Лёгкие закуски и напитки в ожидании церемонии' },
  { time: '16:00', title: 'Церемония регистрации', desc: 'Торжественная церемония бракосочетания' },
  { time: '17:00', title: 'Свадебный ужин', desc: 'Праздничный ужин, тосты и поздравления' },
  { time: '22:00', title: 'AfterParty', desc: 'Финал официальной части, танцы и развлечения' },
  { time: '23:00', title: 'Обратный трансфер', desc: 'Посадка в трансфер, завершение вечера' },
]

const itemRefs = ref([])

function setItemRef(el, index) {
  if (el) itemRefs.value[index] = el
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  ;[titleRef.value, tlRef.value, ...itemRefs.value].forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
.timeline {
  background: #E4D2AF;
}

.tl-container {
  position: relative;
  max-width: 800px;
  margin: 64px auto 0;
}

.tl-line {
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--pink);
}

.tl-item {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 48px;
}

.tl-dot {
  position: absolute;
  z-index: 10;
  left: 12px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  border: 3px solid var(--white);
  box-shadow: 0 0 0 3px var(--pink);
}

.tl-spacer {
  display: none;
}

.tl-card {
  padding-left: 48px;
  text-align: left;
}

.tl-card-right {
  padding-left: 48px;
}

.tl-time {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.05em;
  font-family: 'Montserrat', sans-serif;
}

.tl-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  color: var(--text-dark);
  font-weight: 500;
  margin-top: 4px;
  margin-bottom: 6px;
}

.tl-desc {
  font-size: 0.95rem;
  color: var(--text-light);
  font-weight: 300;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .tl-line {
    left: 50%;
    transform: translateX(-50%);
  }

  .tl-item {
    flex-direction: row;
    align-items: stretch;
  }

  .tl-dot {
    left: 50%;
    transform: translateX(-50%);
  }

  .tl-card {
    width: 50%;
    padding: 0 40px;
  }

  .tl-card-left {
    text-align: right;
    padding-right: 40px;
    padding-left: 0;
  }

  .tl-card-right {
    text-align: left;
    padding-left: 40px;
  }

  .tl-spacer {
    display: block;
    width: 50%;
  }

  .tl-item:nth-child(odd) .tl-spacer {
    order: 2;
  }

  .tl-item:nth-child(even) .tl-spacer {
    order: 0;
  }

  .tl-left .tl-card {
    order: 0;
  }

  .tl-right .tl-card {
    order: 2;
  }
}
</style>
