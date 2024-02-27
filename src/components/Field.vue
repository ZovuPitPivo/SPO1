<template>
  <div class="game-field-container">
    <canvas ref="gameCanvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'GameField',
  mounted() {
    this.setCanvasSize();
    window.addEventListener('resize', this.setCanvasSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.setCanvasSize);
  },
  methods: {
    setCanvasSize() {
      const canvas = this.$refs.gameCanvas;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.drawGameField(); // Перерисовываем поле при изменении размера
    },
    drawGameField() {
      const canvas = this.$refs.gameCanvas;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      // Задаём тёмно-синий фон
      ctx.fillStyle = 'rgba(0,0,5,0.82)'; // Или любой другой оттенок тёмно-синего
      ctx.fillRect(0, 0, width, height);

      // Параметры сетки
      const gridSpacing = 70; // Расстояние между линиями
      const majorLineInterval = 5; // Каждая 10-я линия будет более толстой
      const minorLineWidth = 0.5; // Толщина тонких линий
      const majorLineWidth = 1; // Толщина толстых линий
      const minorLineColor = 'rgba(129,129,129,0.52)'; // Цвет тонких линий
      const majorLineColor = 'rgba(208,208,208,0.55)'; // Цвет толстых линий

      // Рисуем сетку
      for (let x = 0; x <= width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.lineWidth = x % (gridSpacing * majorLineInterval) === 0 ? majorLineWidth : minorLineWidth;
        ctx.strokeStyle = x % (gridSpacing * majorLineInterval) === 0 ? majorLineColor : minorLineColor;
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.lineWidth = y % (gridSpacing * majorLineInterval) === 0 ? majorLineWidth : minorLineWidth;
        ctx.strokeStyle = y % (gridSpacing * majorLineInterval) === 0 ? majorLineColor : minorLineColor;
        ctx.stroke();
      }
    }
  },
};
</script>

<style scoped>
.game-field-container {
  width: 100%;
  height: 100%;
}

canvas {
  display: block; /* Убирает полосу прокрутки */
}
</style>
