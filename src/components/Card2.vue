<template>
  <div :class="{'card2': true, 'loaded': isLoaded}">
    <div class="rectangle2">
      <img class="dlcImg" :src="data.imgSrc" alt="">
    </div>
    <div class="card2-content">
      <h3>{{ data.title }}</h3>
      <p>{{ data.description }}</p>
      <a class="mi" :href="data.link" target="_blank">show me more...</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoaded: false, // Изначально контент не загружен
    };
  },
  mounted() {
    this.isLoaded = true;
    setTimeout(this.loadData, 700);
  },
  methods: {
    loadData() {
      this.isLoaded = true;
    }
  },
  props: ['data'],
};
</script>

<style scoped>
/* Ваши стили для Card2 */
</style>
