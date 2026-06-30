<template>
  <section class="love-story" id="love-story">
    <div class="container">
      <div class="fade-in" ref="titleRef">
        <h2 class="section-title">Наша история</h2>
      </div>

      <div class="love-story-content">
        <div class="love-story-text">
          <div class="fade-in" ref="text1Ref" style="transition-delay: 100ms">
            <p>Иногда самые важные истории начинаются совершенно неожиданно. Наша началась почти девять лет назад в институте. Денис заметил меня на конференции, а позже решился написать в социальной сети. Несколько сообщений, первое свидание — и с этого момента началась наша общая история.</p>
          </div>
          <div class="fade-in" ref="text2Ref" style="transition-delay: 200ms">
            <p>За эти годы было многое: счастливые моменты, новые открытия, путешествия, совместные мечты и планы. Но главное — всё это время мы были рядом друг с другом, и именно это привело нас к самому важному решению.</p>
          </div>
          <div class="fade-in" ref="text3Ref" style="transition-delay: 300ms">
            <p>12 сентября 2026 года мы скажем друг другу самые главные слова и станем семьёй. Нам будет очень радостно, если в этот день вы будете рядом с нами, разделите наши эмоции и станете частью этого счастливого события.</p>
          </div>
        </div>

        <div class="love-story-image-side">
          <div class="fade-in" ref="imageRef" style="transition-delay: 300ms">
            <div class="love-story-image-wrap">
              <div class="love-story-image-bg"></div>
              <img src="/img/story-photo.webp" alt="Елизавета и Денис">
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
const text1Ref = ref(null)
const text2Ref = ref(null)
const text3Ref = ref(null)
const imageRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  ;[titleRef.value, text1Ref.value, text2Ref.value, text3Ref.value, imageRef.value].forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
.love-story {
  background: var(--white);
}

.love-story-content {
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
}

.love-story-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.love-story-text p {
  font-size: 1.1rem;
  color: var(--text-light);
  line-height: 1.7;
  font-weight: 300;
}

.love-story-image-side {
  flex: 1;
  width: 100%;
  max-width: 500px;
}

.love-story-image-wrap {
  position: relative;
  border-radius: 20px;
  overflow: visible;
}

.love-story-image-bg {
  position: absolute;
  inset: -16px;
  border-radius: 24px;
  background: var(--pink);
  opacity: 0.4;
  transform: rotate(-2deg);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}

.love-story-image-wrap:hover .love-story-image-bg {
  transform: rotate(0deg);
}

.love-story-image-wrap img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center 20%;
  display: block;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.love-story-image-wrap:hover img {
  transform: scale(1.02);
}

@media (min-width: 768px) {
  .love-story-content {
    flex-direction: row;
    gap: 40px;
  }

  .love-story-image-side {
    max-width: none;
  }
}
</style>
