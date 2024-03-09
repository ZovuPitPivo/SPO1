<template>
  <div class="container">
    <div class="tabs">
      <div class="tab" :class="{ 'active': currentTab === 'login' }" @click="currentTab = 'login'">Login</div>
      <div class="tab" :class="{ 'active': currentTab === 'register' }" @click="currentTab = 'register'">Register</div>
    </div>

    <Transition name="slide-fade" mode="out-in">
    <div class="tab-content">
      <div v-show="currentTab === 'login'">
        <!-- Форма логина -->
        <form @submit.prevent="login">
          <input type="text" placeholder="Username" v-model="username" required />
          <input type="password" placeholder="Password" v-model="password" required />
          <button type="submit">Login</button>
        </form>
      </div>
      <div v-show="currentTab === 'register'">
        <!-- Форма регистрации -->
        <form @submit.prevent="register">
          <input type="text" placeholder="Username" v-model="username" required />
          <input type="email" placeholder="Email" v-model="email" required />
          <input type="password" placeholder="Password" v-model="password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
    </Transition>
  </div>
</template>

<script>
import axios from 'axios';
import router from "@/router/index.js";
export default {
  data() {
    return {
      currentTab: 'login',
      username: '',
      password: '',
      email: '',
      token: ''
    };
  },
  methods: {
    async login() {
      try {
        // Используйте маршрут входа для проверки учетных данных и получения токена
        const response = await axios.post('http://192.168.1.70:3000/login', {
          Username: this.username,
          Password: this.password
        });
        this.token = response.data.token;
        console.log("You're logged in!");
        // Сохраните токен в localStorage для последующего использования
        localStorage.setItem('user-token', this.token);
        localStorage.setItem('user-name', this.username);
      } catch (error) {
        console.error('Failed to log in:', error.response.data.error);
      }
      await router.push({path: '/'})
    },
    async register() {
      try {
        const response = await axios.post('http://192.168.1.70:3000/players', {
          Username: this.username,
          Password: this.password,
          Email: this.email
        });
        console.log('Registration successful:', response.data);
      } catch (error) {
        console.error('Failed to register:', error.response.data.error);
      }
    }
  },
  created() {
    // Проверьте, есть ли сохраненный токен, и установите его, если есть
    const savedToken = localStorage.getItem('user-token');
    if (savedToken) {
      this.token = savedToken;
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 100px auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  color: black;
}

.tabs {
  display: flex;
  justify-content: space-around;
  background-color: #f3f3f3;
}

.tab {
  width: 50%;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tab.active {
  border-bottom: 2px solid #333;
}

.tab-content {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

</style>
