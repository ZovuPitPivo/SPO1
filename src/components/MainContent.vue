<template>
  <link href="../assets/uicons-solid-rounded.css" rel="stylesheet">
  <div id="content">
    <div class="text">
      <p :class="{ 'dynamicText': true, 'loaded': isLoaded}">{{ dynamicText }}</p>
    </div>
    <div :class="{ 'greyContainer': true, 'loaded': isLoaded}">
      <div class="blackRectangle">
        <img class='image' src="../assets/Images/ph1.jpg" alt="">
      </div>
      <h2>Starting new game</h2>
      <p>Carcsssone season rang match is basically three month a periond of simple text for showing maket</p>
      <button class="greenButton">PLAY</button>
    </div>
    <div :class="{ 'verticalLine': true, 'loaded': isLoaded}"></div>
    <div class="text">
      <p :class="{ 'StaticText1': true, 'loaded': isLoaded}">News</p>
    </div>
    <div class="scrollbar-container">
      <div class="scrollbar"></div>
    </div>
    <div class="cardsContainer">
      <Card v-for="(card, index) in cards" :key="index" :data="card"></Card>
    </div>
    <div class="text">
      <p :class="{ 'StaticText2': true, 'loaded': isLoaded}">DLC</p>
    </div>
    <div class="scrollbar-container2">
      <div class="scrollbar2"></div>
    </div>
    <div class="cardsContainer2">
      <Card2 v-for="(card, index) in cards2" :key="index" :data="card"></Card2>
    </div>
  </div>
</template>

<script>

import Card from "@/components/Card.vue";
import Card2 from "@/components/Card2.vue";
import Sidebar from "@/components/Sidebar.vue";
import '@/assets/styles.css'

export default {
  data() {
    return {
      isLoaded: false,
      isLoaded2: false,
      isLoaded3: false,
      text: "Carcassone season rang match is basically three month a periond of simple text for showing maket",
      dynamicText: "Start game",
      cards: [
        {id: 1, title: "Card 1", imgSrc: "/src/assets/images/newsImg.jpg", text: this.text},
        {id: 2, title: "Card 2", imgSrc: "/src/assets/images/newsImg.jpg", text: this.text},
        {id: 3, title: "Card 3", imgSrc: "/src/assets/images/newsImg.jpg", text: this.text},
        // Добавьте больше карточек по вашему выбору
      ],
      cards2: [
        {id: 1, title: "Card2 1", imgSrc: "/src/assets/images/dlcImg.png"},
        {id: 2, title: "Card2 2", imgSrc: "/src/assets/images/dlcImg.png"},
        {id: 3, title: "Card2 3", imgSrc: "/src/assets/images/dlcImg.png"},
        // Добавьте больше карточек DLC по вашему выбору
      ],
      scrollbarWidth: '0%',
      scrollbarOffset: '0px',
      scrollbar2Width: '0%',
      scrollbar2Offset: '0px',
    };
  },
  components: {
    Card,
    Card2,
    Sidebar,
  },
  computed: {
    scrollbarStyle() {
      return {
        width: this.scrollbarWidth,
        transform: `translateX(${this.scrollbarOffset})`,
      };
    },
    scrollbar2Style() {
      return {
        width: this.scrollbar2Width,
        transform: `translateX(${this.scrollbar2Offset})`,
      };
    },
  },
  mounted() {
  },
  methods: {
    loadData() {
      this.isLoaded = true;
    },
    loadData2() {
      this.isLoaded2 = true;
    },
    loadData3() {
      this.isLoaded3 = true;
    },

    handleScroll() {
      const container = this.$refs.cardsContainer;
      const scrollPercentage = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
      this.scrollbarWidth = `${(container.clientWidth / container.scrollWidth) * 100}%`;
      this.scrollbarOffset = `${scrollPercentage * (container.clientWidth - parseFloat(this.scrollbarWidth)) / 100}px`;
    },
    handleScroll2() {
      const container = this.$refs.cardsContainer2;
      const scrollPercentage = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
      this.scrollbar2Width = `${(container.clientWidth / container.scrollWidth) * 100}%`;
      this.scrollbar2Offset = `${scrollPercentage * (container.clientWidth - parseFloat(this.scrollbar2Width)) / 100}px`;
    },
    checkAuth() {
      // Проверяем наличие токена в localStorage
      const token = localStorage.getItem('user-token');
      this.isAuthenticated = !!token;
    },
  },
  created() {
    this.checkAuth();
    setTimeout(this.loadData, 0);
    setTimeout(this.loadData2, 700);
    setTimeout(this.loadData3, 1400);
  },
};
</script>

<style scoped>
#content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
}

</style>
