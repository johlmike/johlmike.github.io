<template>
  <div class="home">
    <Carousel :isTop="isTop"></Carousel>
    <div>123</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Carousel.vue';

export default {
  name: 'Home',
  props: {
    isTop: Boolean,
  },
  components: {
    Carousel,
  },
};
</script>
