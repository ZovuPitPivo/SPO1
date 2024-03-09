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
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
      <div v-show="currentTab === 'register'">
        <!-- Форма регистрации -->
        <form @submit.prevent="register">
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
    </Transition>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      currentTab: 'login',
      username: '',
      password: '',
      email: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.get(`http://localhost:3000/players?Username=${this.username}&Password=${this.password}`);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async register() {
      try {
        const response = await axios.post('http://localhost:3000/players', {
          Username: this.username,
          Password: this.password,
          Email: this.email
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

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

.login-form, .register-form {
  display: block;
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
