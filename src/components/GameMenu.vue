<template>
  <div class="menu-container">
    <button v-for="button in buttons" :key="button.id" class="menu-button" @click="handleButtonClick(button.id)">
      <i :class="`fi ${button.icon}`"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'GameMenu',
  data() {
    return {
      buttons: [
        { id: 1, icon: 'fi-sr-diamond-turn-right', func: 'takeCard' },
        { id: 2, icon: 'fi-sr-arrow-down-to-square', func: 'placeCard' },
        { id: 3, icon: 'fi-sr-rotate-left', func: 'rotateLeft' },
        { id: 4, icon: 'fi-sr-rotate-right', func: 'rotateRight' },
      ],
    };
  },
  methods: {
    handleButtonClick(id) {
      const button = this.buttons.find(btn => btn.id === id);
      if (button.func) {
        this.$emit(button.func);
      }
    },
  },
};
</script>

<style scoped>
.menu-container {
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  background: gray;
  bottom: 15px;
  left: 15px;
  display: flex;
  gap: 10px;
}

.menu-button {
  padding-top: 5px;
  font-size: 23pt;
  background: gray;
  border: none;
  cursor: pointer;
  color: black;
}
</style>
