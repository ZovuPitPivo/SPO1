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
