<template>
  <HeroSection :guestName="guestName" />
  <LoveStory />
  <DatePlace />
  <DressCode />
  <TimelineSection />
  <TimerSection />
  <RsvpForm :guestName="guestName" />
  <SiteFooter />
</template>

<script setup>
import { onMounted } from 'vue'
import { useGuest } from './composables/useGuest'
import HeroSection from './components/HeroSection.vue'
import LoveStory from './components/LoveStory.vue'
import DatePlace from './components/DatePlace.vue'
import DressCode from './components/DressCode.vue'
import TimelineSection from './components/TimelineSection.vue'
import TimerSection from './components/TimerSection.vue'
import RsvpForm from './components/RsvpForm.vue'
import SiteFooter from './components/SiteFooter.vue'

const { guestName, initGuestName } = useGuest()

onMounted(() => {
  initGuestName()
})
</script>
