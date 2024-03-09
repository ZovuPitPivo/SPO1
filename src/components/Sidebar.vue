<template>
  <div id="sidebar" :class="{ 'loaded': isLoaded, 'expanded': isExpanded }">
    <button @click="toggleSidebar" :class="{'playCrossBtn': true, 'active': isExpanded}"></button>
    <div class="menu-icons">
      <div class="menu-icon" v-for="(icon, index) in icons" :key="index">
        <router-link :to="icon.path">
          <div class="menu-icon-label">{{ icon.label }}</div>
          <i :class="icon.class"></i>
        </router-link>
      </div>
    </div>
<!--    <div class="user">-->
<!--      <i class="fi fi-sr-user-injured"></i>-->
<!--    </div>-->
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: 'Авторизация',
      isAuthenticated: false,
      isExpanded: false,
      isLoaded: false,
      icons: [
        {class: 'fi fi-sr-play', label: 'Запустить игру', path: '/Game'},
        {class: 'fi fi-sr-globe', label: 'Создать комнату', path: ''},
        {class: 'fi fi-sr-user-injured', label: this.whoAmI(), path: '/registration'},
        {class: 'fi fi-sr-settings', label: 'Настройки', path: ''},
      ],
    };
  },
  mounted() {
    this.loadData();
    this.checkAuth();
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
    whoAmI() {
      this.checkAuth()
      return this.user
    },
    checkAuth() {
      // Проверяем наличие токена в localStorage
      const token = localStorage.getItem('user-token');
      !!token ? this.user = localStorage.getItem('user-name') : 'Авторизация';
    },
  },
};
</script>

<style scoped>
.user {
  position: relative;
}

.playCrossBtn {
  top: 0;
  left: 0;
  cursor: pointer;
  display: block;
  position: relative;
  border: none;
  background: transparent;
  width: 40px;
  height: 26px;
  margin: 10px;
}
.playCrossBtn::before,
.playCrossBtn::after {
  content: '';
  left: 0;
  position: absolute;
  display: block;
  width: 100%;
  height: 4px;
  border-radius: 10px;
  background: #C5C5C5;
}
.playCrossBtn::before {
  top: 0;
  box-shadow: 0 11px 0 #C5C5C5;
  transition: box-shadow .3s .15s, top .3s .15s, transform .3s;
}
.playCrossBtn::after {
  bottom: 0;
  transition: bottom .3s .15s, transform .3s;
}
.playCrossBtn.active::before {
  top: 11px;
  transform: rotate(45deg);
  box-shadow: 0 6px 0 rgba(0,0,0,0);
  transition: box-shadow .15s, top .3s, transform .3s .15s;
}
.playCrossBtn.active::after {
  bottom: 11px;
  transform: rotate(-45deg);
  transition: bottom .3s, transform .3s .15s;
}
</style>
