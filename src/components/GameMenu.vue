<template>
  <div class="menu-container">
    <button v-for="button in buttons" :key="button.id" class="menu-button">
      <i :class="`fi ${button.icon}`"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'GameMenu',
  data() {
    return {
      fb_states: [
        { id: 1, icon: 'fi-sr-diamond-turn-right' }, // Get the card (start turn)
        { id: 2, icon: "fi-sr-arrow-down-to-square"}, // Place the card
        { id: 3, icon: "fi-sr-badge-check"} // End turn
      ],
      buttons: [
        { id: 1, icon: 'fi-sr-diamond-turn-right' },
        { id: 2, icon: 'fi-sr-admin' },
        { id: 3, icon: 'fi-sr-rotate-left' },
        { id: 4, icon: 'fi-sr-rotate-right' },
      ],
    };
  },
};
</script>

<style scoped>
.menu-container {
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  background: white;
  bottom: 15px;
  left: 15px;
  display: flex;
  gap: 10px;
}

.menu-button {
  padding-top: 5px;
  font-size: 23pt;
  background: white;
  border: none;
  cursor: pointer;
  color: black;
}
</style>

