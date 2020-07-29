<template>
  <div>
    <NavBar :isTop="false"></NavBar>
    <div class="product">
      產品頁面
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
.product {
  margin-top: 3.5rem;
}
</style>
