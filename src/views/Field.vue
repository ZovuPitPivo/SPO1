<template>
  <div class="game-field-container">
    <canvas ref="gameCanvas" @click="handleClick">
    </canvas>
    <GameMenu @takeCard="takeCard" @placeCard="placeCard" @rotateLeft="rotateLeft" @rotateRight="rotateRight"/>
  </div>
</template>

<script>
import GameMenu from "@/components/GameMenu.vue";

const tileInfo = [
  {path: '/src/assets/tiles/0r0c_R0+M.svg', count: 4},
  {path: '/src/assets/tiles/0r0c_R1.svg', count: 2},
  {path: '/src/assets/tiles/0r0c_R2_(A).svg', count: 2},
  {path: '/src/assets/tiles/0r0c_R2_(B).svg', count: 2},
  {path: '/src/assets/tiles/0r1c_R0.svg', count: 5},
  {path: '/src/assets/tiles/0r2c_R0_(A).svg', count: 3},
  {path: '/src/assets/tiles/0r2c_R0_(B).svg', count: 2},
  {path: '/src/assets/tiles/0r2c_R0_(C)+C.svg', count: 2},
  {path: '/src/assets/tiles/0r2c_R0_(C).svg', count: 1},
  {path: '/src/assets/tiles/0r2c_R0_(D)+C.svg', count: 2},
  {path: '/src/assets/tiles/0r2c_R0_(D).svg', count: 3},
  {path: '/src/assets/tiles/0r2c_R2_(A).svg', count: 1},
  {path: '/src/assets/tiles/0r2c_R2_(B).svg', count: 1},
  {path: '/src/assets/tiles/0r3c_R0+C.svg', count: 1},
  {path: '/src/assets/tiles/0r3c_R0.svg', count: 3},
  {path: '/src/assets/tiles/0r4c_R0+C.svg', count: 1},
  {path: '/src/assets/tiles/1r0c_R0+M.svg', count: 2},
  {path: '/src/assets/tiles/1r0c_R2+M.svg', count: 1},
  {path: '/src/assets/tiles/1r1c_R2.svg', count: 1},
  {path: '/src/assets/tiles/1r3c_R0+C.svg', count: 2},
  {path: '/src/assets/tiles/1r3c_R0.svg', count: 1},
  {path: '/src/assets/tiles/2r0c_R0_(A).svg', count: 8},
  {path: '/src/assets/tiles/2r0c_R0_(B).svg', count: 9},
  {path: '/src/assets/tiles/2r0c_R2_(A).svg', count: 1},
  {path: '/src/assets/tiles/2r0c_R2_(B).svg', count: 1},
  {path: '/src/assets/tiles/2r1c_R0_(A).svg', count: 4},
  {path: '/src/assets/tiles/2r1c_R0_(B).svg', count: 3},
  {path: '/src/assets/tiles/2r1c_R0_(C).svg', count: 3},
  {path: '/src/assets/tiles/2r2c_R0+C.svg', count: 2},
  {path: '/src/assets/tiles/2r2c_R0.svg', count: 3},
  {path: '/src/assets/tiles/3r0c_R0+V.svg', count: 4},
  {path: '/src/assets/tiles/3r1c_R0+V.svg', count: 3},
  {path: '/src/assets/tiles/4r0c_R0+V.svg', count: 1},
];

let images = [];
tileInfo.forEach(tile => {
  for (let i = 0; i < tile.count; i++) {
    images.push(tile.path);
  }
});

let riversImgs = images.filter(img => img.includes('R1') || img.includes('R2'));
const firstIndex = riversImgs.findIndex(img => img.includes('0r0c_R1.svg'));
const lastIndex = riversImgs.lastIndexOf('/src/assets/tiles/0r0c_R1.svg');

console.log(riversImgs)
console.log(firstIndex, lastIndex)

if (firstIndex !== -1) {
  riversImgs.splice(firstIndex, 1);
  riversImgs.unshift('/src/assets/tiles/0r0c_R1.svg');
}

if (lastIndex !== -1) {
  riversImgs.splice(lastIndex, 1);
  riversImgs.push('/src/assets/tiles/0r0c_R1.svg');
}
images = images.filter(img => img.includes('R0'));

export default {
  name: 'GameField',
  components: {GameMenu},
  data() {
    return {
      images,
      riversImgs,
      gridSpacing: 70,
      riversImgsIndex: 0,
      selectedCell: null,
      selectedImage: null,
      selectedImageRotation: 0,
      selectedCellBorder: null,
    };
  },
  mounted() {
    this.setCanvasSize();
    window.addEventListener('resize', this.setCanvasSize);
    window.addEventListener('resize', this.drawSelectedImage);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.setCanvasSize);
    window.removeEventListener('resize', this.drawSelectedImage);
  },
  methods: {
    setCanvasSize() {
      const canvas = this.$refs.gameCanvas;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.drawGameField();
      this.drawSelectedImage();
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
    },
    takeCard() {
      if (this.riversImgsIndex < this.riversImgs.length) {
        // Еще есть изображения рек для выбора
        this.selectedImage = this.riversImgs[this.riversImgsIndex++];
        this.drawSelectedImage();
      } else if (this.images.length > 0) {
        // Изображения рек закончились, выбираем из оставшихся изображений
        let randomIndex = Math.floor(Math.random() * this.images.length);
        this.selectedImage = this.images.splice(randomIndex, 1)[0];
        this.drawSelectedImage();
      }
    },
    placeCard() {
      if (this.selectedCell && this.selectedImage) {
        const {x, y} = this.selectedCell;
        this.drawSvgImage(x, y, this.selectedImage, this.selectedImageRotation);
        this.selectedImage = null;
        this.selectedImageRotation = 0;
        this.selectedCell = null;
        this.selectedCellBorder = null;
      }
    },
    rotateRight() {
      if (this.selectedImage) {
        this.selectedImageRotation += 90;
        if (this.selectedImageRotation >= 360) {
          this.selectedImageRotation = 0;
        }
        this.drawSelectedImage();
      }
    },
    rotateLeft() {
      if (this.selectedImage) {
        this.selectedImageRotation -= 90;
        if (this.selectedImageRotation < 0) {
          this.selectedImageRotation = 270;
        }
        this.drawSelectedImage();
      }
    },
    handleClick(event) {
      const rect = this.$refs.gameCanvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const gridX = Math.floor(x / this.gridSpacing);
      const gridY = Math.floor(y / this.gridSpacing);

      this.selectedCell = {x: gridX, y: gridY};
      this.selectedCellBorder = {x: gridX, y: gridY};
      this.drawSelectedImage();

    },
    drawSvgImage(gridX, gridY, imgSrc, rotation) {
      const canvas = this.$refs.gameCanvas;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        ctx.save();
        // Поворачиваем изображение вокруг его центра
        const x = gridX * this.gridSpacing + this.gridSpacing / 2;
        const y = gridY * this.gridSpacing + this.gridSpacing / 2;
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.drawImage(img, -this.gridSpacing / 2, -this.gridSpacing / 2, this.gridSpacing, this.gridSpacing);
        ctx.restore();
      };
    },
    drawSelectedImage() {
      if (!this.selectedImage) return;
      const canvas = this.$refs.gameCanvas;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = this.selectedImage;
      img.onload = () => {
        const x = canvas.width - this.gridSpacing - 10;
        const y = 10;
        ctx.save();
        ctx.translate(x + this.gridSpacing / 2, y + this.gridSpacing / 2);
        ctx.rotate(this.selectedImageRotation * Math.PI / 180);
        ctx.drawImage(img, -this.gridSpacing / 2, -this.gridSpacing / 2, this.gridSpacing, this.gridSpacing);
        ctx.restore();
      };
    },
  },
};
</script>

<style scoped>
.game-field-container {
  width: 100%;
  height: 100%;
  position: relative;
}

canvas {
  display: block; /* Убирает полосу прокрутки */
}
</style>