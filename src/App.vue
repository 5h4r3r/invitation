<template>
  <NavBar />
  <HeroSection :guestName="guestName" />
  <LoveStory />
  <DatePlace />
  <MapSection />
  <DressCode />
  <TimelineSection />
  <TimerSection />
  <FaqSection />
  <MusicPlayer
    v-if="config.musicPlayer.enabled"
    :tracks="config.musicPlayer.tracks"
    :label="config.musicPlayer.tracks[0]?.label || ''"
  />
  <PhotoGallery
    v-if="config.photoGallery.enabled"
    :link="config.photoGallery.link"
  />
  <RsvpForm :guestName="guestName" />
  <SiteFooter />
</template>

<script setup>
import { onMounted } from 'vue'
import { useGuest } from './composables/useGuest'
import config from './config'
import HeroSection from './components/HeroSection.vue'
import NavBar from './components/NavBar.vue'
import LoveStory from './components/LoveStory.vue'
import DatePlace from './components/DatePlace.vue'
import MapSection from './components/MapSection.vue'
import DressCode from './components/DressCode.vue'
import TimelineSection from './components/TimelineSection.vue'
import TimerSection from './components/TimerSection.vue'
import FaqSection from './components/FaqSection.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import PhotoGallery from './components/PhotoGallery.vue'
import RsvpForm from './components/RsvpForm.vue'
import SiteFooter from './components/SiteFooter.vue'

const { guestName, initGuestName } = useGuest()

onMounted(() => {
  initGuestName()
})
</script>
