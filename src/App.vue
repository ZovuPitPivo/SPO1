<!--<template>-->
<!--  <div id="app">-->
<!--    <GameField ref="fieldComponent" />-->
<!--    <GameMenu @rotate-image="rotateImageInField" />-->
<!--  </div>-->
<!--  <link href="./assets/uicons-solid-rounded.css" rel="stylesheet">-->
<!--</template>-->

<!--<script>-->
<!--import GameField from './components/Field.vue'; // Импорт компонента GameField-->
<!--import GameMenu from './components/GameMenu.vue'; // Импорт компонента GameMenu-->
<!--import './assets/main.css';-->


<!--export default {-->
<!--  name: 'App',-->
<!--  components: {-->
<!--    GameField, // Регистрация компонента GameField-->
<!--    GameMenu,-->
<!--  },-->
<!--  methods: {-->
<!--    rotateImageInField(direction) {-->
<!--      console.log(1)-->
<!--      this.$refs.fieldComponent.rotateSelectedImage(direction);-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--#app {-->
<!--  text-align: center;-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  position: relative;-->
<!--}-->
<!--</style>-->


<!--<template>-->
<!--  <div id="app">-->
<!--    <Sidebar />-->
<!--    <MainContent />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import MainContent from './components/MainContent.vue'-->
<!--import Sidebar from './components/Sidebar.vue'-->
<!--import './assets/styles.css'-->

<!--export default {-->
<!--  name: 'App',-->
<!--  components: {-->
<!--    Sidebar,-->
<!--    MainContent,-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--/* Здесь могут быть глобальные стили */-->
<!--</style>-->

<template>
  <router-link to="/">Go to Home</router-link>
  <router-link to="/Game">Go to Game</router-link>
  <router-view></router-view>
</template>
<script setup>
</script>