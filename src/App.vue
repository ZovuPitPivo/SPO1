<template>
  <div id="app">
    <GameField/>
    <GameMenu/>
  </div>
  <link href="./assets/uicons-solid-rounded.css" rel="stylesheet">
</template>

<script>
import GameField from './components/Field.vue'; // Импорт компонента GameField
import GameMenu from './components/GameMenu.vue'; // Импорт компонента GameMenu
import './assets/main.css';


export default {
  name: 'App',
  components: {
    GameField, // Регистрация компонента GameField
    GameMenu,
  },
};
</script>

<style>
#app {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
}
</style>
