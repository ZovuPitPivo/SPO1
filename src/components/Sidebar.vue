<template>
  <div id="sidebar" :class="{ 'loaded': isLoaded, 'expanded': isExpanded }">
    <button @click="toggleSidebar" class="playCrossBtn"></button>
    <div class="menu-icons">
      <div class="menu-icon" v-for="(icon, index) in icons" :key="index">
        <router-link :to="icon.path">
          <div class="menu-icon-label">{{ icon.label }}</div>
          <i :class="icon.class"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isExpanded: false,
      isLoaded: false,
      icons: [
        {class: 'fi fi-sr-play', label: 'Запустить игру', path: '/Game'},
        {class: 'fi fi-sr-globe', label: 'Создать комнату', path: ''},
        {class: 'fi fi-sr-settings', label: 'Настройки', path: ''},
      ],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded;
    },
    // async loadData() {
    //   try {
    //     // Загрузка данных
    //     // Предположим, это асинхронный вызов
    //     await fetchData();
    //     this.isLoaded = true;
    //   } catch (error) {
    //     console.error("Ошибка загрузки данных", error);
    //   }
    // },
    loadData() {
      this.isLoaded = true;
    },
  },
};
</script>

<style scoped>
/* Ваши стили для Sidebar */
</style>
