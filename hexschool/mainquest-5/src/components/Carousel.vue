<template>
  <div class="carousel slide mb-5" data-ride="carousel">
    <div class="carousel-inner vh-100 h-100">
      <div class="carousel-item active">
        <img src="../assets/carousel-1.jpg" class="d-block w-100" alt="#" />
      </div>
      <div class="carousel-item">
        <img src="../assets/carousel-2.jpg" class="d-block w-100" alt="#" />
      </div>
      <div class="carousel-item">
        <img src="../assets/carousel-3.jpg" class="d-block w-100" alt="#" />
      </div>
    </div>
    <div class="mouse" :class="{hide: !isTop}">
      <font-awesome-icon :icon="['fas', 'chevron-down']" class="icon-cart" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isTop: Boolean,
  },
};
</script>

<style lang="scss" scoped>
// 因暫時無法編輯圖片，故使用css調整位置，看起來好看一點
.carousel-item img {
  position: absolute;
  top: -130px;
}

.hide {
  display: none;
}

.mouse {
  color: white;
  font-size: 3.5rem;
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  margin-bottom: -2rem;
  -webkit-animation: mouse 0.8s infinite;
}
@-webkit-keyframes mouse {
  0% {
    bottom: 30px;
    font-size: 3.5rem;
  }
  50% {
    bottom: 0px;
    font-size: 2rem;
  }
  100% {
    bottom: 30px;
    font-size: 3.5rem;
  }
}
</style>
