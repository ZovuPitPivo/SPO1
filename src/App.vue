<template>
  <div id="app">
    <GameField/>
  </div>
</template>

<script>
import GameField from './components/Field.vue'; // Импорт компонента GameField
import './assets/main.css';


export default {
  name: 'App',
  components: {
    GameField, // Регистрация компонента GameField
  },
};
</script>

<style>
#app {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>


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