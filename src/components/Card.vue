<template>
  <div :class="{'card': true, 'loaded': isLoaded}">
    <div class="rectangle1">
      <img class="newsImg" :src="data.imgSrc" alt="">
    </div>
    <p>{{ data.text }}</p>
    <a class="mi">show me more...</a>
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
    setTimeout(this.loadData, 150);
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
/* Ваши стили для Card */
</style>
