<template>
  <div id="app">
    <Sidebar />
    <MainContent />
  </div>
</template>

<script>
import MainContent from './components/MainContent.vue'
import Sidebar from './components/Sidebar.vue'
import './assets/styles.css'

export default {
  name: 'App',
  components: {
    Sidebar,
    MainContent,
  }
}
</script>

<style>
/* Здесь могут быть глобальные стили */
</style>